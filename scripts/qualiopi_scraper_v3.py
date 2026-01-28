#!/usr/bin/env python3
"""
Qualiopi Scraper v3 - Using Google redirect for website discovery
"""

import json
import re
import csv
import time
import subprocess
import urllib.request
import urllib.parse
import ssl

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

DATE_PATTERNS = [
    (r'qualiopi.*?(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})', 'full'),
    (r'certifi[ée].*?(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})', 'full'),
    (r'(\d{1,2}[/.-]\d{1,2}[/.-]\d{4}).*?qualiopi', 'full'),
    (r'valid.*?jusqu.*?(\d{1,2}[/.-]\d{1,2}[/.-]\d{4})', 'expiry'),
    (r'(\d{1,2})\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s*(\d{4})', 'month'),
    (r'depuis\s*(\d{4})', 'year'),
]

MONTH_MAP = {
    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
}

def fetch(url, timeout=15):
    """Fetch URL content."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'fr-FR,fr;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=timeout, context=ssl_context) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except:
        return None

def find_website_google(company_name, city=''):
    """Find website using Google redirect."""
    query = f"{company_name} formation {city}".strip()
    query_encoded = query.replace(' ', '+')
    
    try:
        result = subprocess.run(
            ['curl', '-sL', f'https://www.google.com/search?q={query_encoded}&btnI=1',
             '-H', 'User-Agent: Mozilla/5.0', '-o', '/dev/null', '-w', '%{url_effective}'],
            capture_output=True, text=True, timeout=10
        )
        url = result.stdout.strip()
        
        if url and 'google.com/url' in url:
            # Extract the actual URL from Google redirect
            match = re.search(r'[?&]q=([^&]+)', url)
            if match:
                url = urllib.parse.unquote(match.group(1))
        
        # Skip unwanted domains
        skip_domains = ['google.com', 'linkedin.com', 'facebook.com', 'twitter.com',
                        'societe.com', 'pappers.fr', 'pagesjaunes.fr', 'infogreffe.fr',
                        'verif.com', 'annuaire', 'manageo.fr', 'data.gouv.fr', 
                        'youtube.com', 'kompass.com', 'lyon-entreprises.com']
        
        if url and not any(d in url.lower() for d in skip_domains):
            # Clean URL - get base domain
            parsed = urllib.parse.urlparse(url)
            return f"{parsed.scheme}://{parsed.netloc}"
        
        return None
    except:
        return None

def extract_dates(content):
    """Extract Qualiopi dates from content."""
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
                date_str = match
            else:
                date_str = match if isinstance(match, str) else match[0]
            
            # Determine if cert or expiry
            idx = content_lower.find(str(date_str).lower())
            if idx >= 0:
                ctx = content_lower[max(0, idx-100):idx+100]
                if any(w in ctx for w in ['jusqu', 'expir', 'fin de valid']):
                    if not expiry_date:
                        expiry_date = date_str
                elif any(w in ctx for w in ['depuis', 'obtenu', 'certifié', 'délivré']):
                    if not cert_date:
                        cert_date = date_str
                elif not cert_date:
                    cert_date = date_str
    
    return cert_date, expiry_date

def scrape_website(url):
    """Scrape website for Qualiopi info."""
    content = fetch(url)
    if not content:
        return None, None, 'unreachable'
    
    cert, expiry = extract_dates(content)
    
    if not cert and not expiry:
        base = url.rstrip('/')
        for sub in ['/qualiopi', '/certification', '/qualite', '/notre-certification',
                    '/a-propos', '/qui-sommes-nous', '/about', '/certifications']:
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
    csv_path = '/root/obsidian-vault/LifeOS/Work/TeachInspire-Prospects.csv'
    prospects = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        prospects = list(reader)
    
    print(f"Loaded {len(prospects)} prospects")
    print("Processing first 25 as test...\n")
    
    results = []
    for i, p in enumerate(prospects[:25]):
        name = p.get('Nom', 'Unknown')
        city = p.get('Ville', '')
        region = p.get('Région', '')
        
        print(f"[{i+1}/25] {name} ({city or region})")
        
        result = {
            'name': name,
            'siren': p.get('SIREN', ''),
            'city': city,
            'region': region,
            'formateurs': p.get('Formateurs', ''),
            'website': None,
            'cert_date': None,
            'expiry_date': None,
            'status': 'pending'
        }
        
        # Find website
        website = find_website_google(name, city or region)
        if website:
            result['website'] = website
            print(f"  → {website}")
            
            cert, expiry, status = scrape_website(website)
            result['cert_date'] = cert
            result['expiry_date'] = expiry
            result['status'] = status
            
            if cert:
                print(f"  ✓ Cert: {cert}")
            if expiry:
                print(f"  ⏰ Expiry: {expiry}")
            if status == 'mentioned_no_date':
                print(f"  📝 Qualiopi mentioned, no date")
        else:
            result['status'] = 'no_website'
            print(f"  ✗ No website")
        
        results.append(result)
        time.sleep(2)  # Rate limit Google
    
    # Save results
    output_path = '/tmp/qualiopi_results_v3.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Summary
    print("\n" + "="*50)
    print("SUMMARY")
    print("="*50)
    
    found = [r for r in results if r['status'] == 'found']
    mentioned = [r for r in results if r['status'] == 'mentioned_no_date']
    no_web = [r for r in results if r['status'] == 'no_website']
    
    print(f"✅ Found dates: {len(found)}")
    print(f"📝 Mentioned (no date): {len(mentioned)}")
    print(f"❌ No website: {len(no_web)}")
    
    if found:
        print("\n🎯 PROSPECTS WITH DATES:")
        for r in found:
            exp = r['expiry_date'] or 'unknown'
            print(f"  • {r['name']}: cert={r['cert_date']}, expiry={exp}")
            print(f"    {r['website']}")
    
    print(f"\nFull results: {output_path}")

if __name__ == '__main__':
    main()
