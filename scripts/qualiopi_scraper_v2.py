#!/usr/bin/env python3
"""
Qualiopi Scraper v2 - Using direct web search for websites
"""

import json
import re
import csv
import time
import urllib.request
import urllib.parse
import ssl

# Disable SSL verification for problematic sites
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

DATE_PATTERNS = [
    # French date formats
    (r'qualiopi.*?(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})', 'full'),
    (r'certifi[ée].*?(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})', 'full'),
    (r'(\d{1,2}[/.-]\d{1,2}[/.-]\d{4}).*?qualiopi', 'full'),
    (r'valid.*?jusqu.*?(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})', 'expiry'),
    (r'(\d{1,2})\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s*(\d{4})', 'month'),
    (r'depuis\s*(\d{4})', 'year'),
    (r'certifié.*?(\d{4})', 'year'),
]

MONTH_MAP = {
    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
}

def fetch(url, timeout=15):
    """Fetch URL with error handling."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        })
        with urllib.request.urlopen(req, timeout=timeout, context=ssl_context) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return None

def search_website(company_name, siren):
    """Find company website via multiple methods."""
    
    # Method 1: Direct search on recherche-entreprises API
    try:
        api_url = f"https://recherche-entreprises.api.gouv.fr/search?q={urllib.parse.quote(company_name)}&page=1&per_page=3"
        content = fetch(api_url)
        if content:
            data = json.loads(content)
            for r in data.get('results', []):
                if r.get('siren') == siren:
                    # Found the company, but API doesn't have website
                    # Get the commune/city for better search
                    siege = r.get('siege', {})
                    city = siege.get('libelle_commune', '')
                    if city:
                        company_name = f"{company_name} {city}"
                    break
    except:
        pass
    
    # Method 2: DuckDuckGo search
    search_url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(company_name + ' formation officiel')}"
    content = fetch(search_url)
    if content:
        # Extract result URLs
        links = re.findall(r'href="(https?://[^"]+)"[^>]*class="result__url"', content)
        if not links:
            links = re.findall(r'href="(https?://(?!duckduckgo)[^"]+\.(?:fr|com|eu|net|org)[^"]*)"', content)
        
        for link in links[:5]:
            # Skip social media, directories, etc
            skip = ['linkedin', 'facebook', 'twitter', 'youtube', 'instagram', 
                    'societe.com', 'pappers', 'infogreffe', 'verif.com', 'pagesjaunes',
                    'annuaire', 'kompass', 'manageo', 'data.gouv']
            if not any(s in link.lower() for s in skip):
                # Clean up tracking parameters
                link = link.split('?')[0] if '?' in link and 'uddg=' in link else link
                return link
    
    return None

def extract_dates(content):
    """Extract certification and expiry dates from content."""
    if not content or 'qualiopi' not in content.lower():
        return None, None
    
    content_lower = content.lower()
    cert_date = None
    expiry_date = None
    
    for pattern, dtype in DATE_PATTERNS:
        matches = re.findall(pattern, content_lower)
        for match in matches:
            if dtype == 'month' and isinstance(match, tuple):
                day, month, year = match
                date_str = f"{day}/{MONTH_MAP.get(month, '01')}/{year}"
            elif dtype == 'year':
                date_str = match  # Just year
            else:
                date_str = match if isinstance(match, str) else match[0]
            
            # Determine if cert or expiry based on context
            idx = content_lower.find(date_str if isinstance(date_str, str) else str(match))
            if idx > 0:
                context = content_lower[max(0, idx-100):idx+100]
                if any(w in context for w in ['jusqu', 'expir', 'fin de valid', 'valable jusqu']):
                    if not expiry_date:
                        expiry_date = date_str
                elif any(w in context for w in ['depuis', 'obtenu', 'certifié le', 'délivré']):
                    if not cert_date:
                        cert_date = date_str
                elif not cert_date:
                    cert_date = date_str
    
    return cert_date, expiry_date

def scrape_for_qualiopi(url):
    """Scrape a website for Qualiopi info."""
    content = fetch(url)
    if not content:
        return None, None, 'unreachable'
    
    cert, expiry = extract_dates(content)
    
    # If not found on main page, try common subpages
    if not cert and not expiry:
        base = url.rstrip('/')
        for sub in ['/qualiopi', '/certification', '/qualite', '/notre-certification', 
                    '/a-propos', '/qui-sommes-nous', '/about']:
            sub_content = fetch(f"{base}{sub}")
            if sub_content:
                cert, expiry = extract_dates(sub_content)
                if cert or expiry:
                    break
            time.sleep(0.3)
    
    if cert or expiry:
        return cert, expiry, 'found'
    elif 'qualiopi' in content.lower():
        return None, None, 'mentioned_no_date'
    else:
        return None, None, 'not_mentioned'

def main():
    # Load prospects
    csv_path = '/root/obsidian-vault/LifeOS/Work/TeachInspire-Prospects.csv'
    prospects = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        prospects = list(reader)
    
    print(f"Loaded {len(prospects)} prospects")
    print("Processing first 15 as test...\n")
    
    results = []
    for i, p in enumerate(prospects[:15]):
        name = p.get('Nom', 'Unknown')
        siren = p.get('SIREN', '')
        print(f"[{i+1}/15] {name}")
        
        result = {
            'name': name,
            'siren': siren,
            'region': p.get('Région', ''),
            'formateurs': p.get('Formateurs', ''),
            'website': None,
            'cert_date': None,
            'expiry_date': None,
            'status': 'pending'
        }
        
        # Find website
        website = search_website(name, siren)
        if website:
            result['website'] = website
            print(f"  → Website: {website}")
            
            # Scrape for Qualiopi info
            cert, expiry, status = scrape_for_qualiopi(website)
            result['cert_date'] = cert
            result['expiry_date'] = expiry
            result['status'] = status
            
            if cert:
                print(f"  → Cert date: {cert}")
            if expiry:
                print(f"  → Expiry: {expiry}")
            if status == 'mentioned_no_date':
                print(f"  → Qualiopi mentioned but no date found")
        else:
            result['status'] = 'no_website'
            print(f"  → No website found")
        
        results.append(result)
        time.sleep(1.5)  # Be polite
    
    # Save results
    with open('/tmp/qualiopi_results_v2.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Summary
    print("\n" + "="*50)
    print("SUMMARY")
    print("="*50)
    found = [r for r in results if r['status'] == 'found']
    mentioned = [r for r in results if r['status'] == 'mentioned_no_date']
    no_web = [r for r in results if r['status'] == 'no_website']
    
    print(f"✅ Found dates: {len(found)}")
    print(f"📝 Qualiopi mentioned (no date): {len(mentioned)}")
    print(f"❌ No website found: {len(no_web)}")
    
    if found:
        print("\nProspects with dates found:")
        for r in found:
            print(f"  • {r['name']}: cert={r['cert_date']}, expiry={r['expiry_date']}")

if __name__ == '__main__':
    main()
