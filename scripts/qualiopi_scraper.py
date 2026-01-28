#!/usr/bin/env python3
"""
Qualiopi Expiry Date Scraper
Finds certification dates from company websites and enriches prospect data.
"""

import json
import re
import csv
import time
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path

# Date patterns to look for (French formats)
DATE_PATTERNS = [
    r'certifi[ée].*?qualiopi.*?(?:depuis|le|en)\s*:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
    r'qualiopi.*?certifi[ée].*?(?:depuis|le|en)\s*:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
    r'certifi[ée].*?qualiopi.*?(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4})',
    r'qualiopi.*?(\d{4})',  # Just year as fallback
    r'valid(?:e|ité).*?(?:jusqu|au)\s*[:\']?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
    r'expir.*?(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
    r'fin de validité.*?(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
]

def fetch_url(url, timeout=10):
    """Fetch URL content with basic error handling."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; QualiopiBot/1.0)'
        })
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return None

def find_website_from_siren(siren):
    """Try to find company website from SIREN using Pappers/annuaire."""
    # Try annuaire-entreprises
    url = f"https://annuaire-entreprises.data.gouv.fr/entreprise/{siren}"
    content = fetch_url(url)
    if content:
        # Look for website link
        match = re.search(r'href="(https?://[^"]+)"[^>]*>(?:Site web|Website)', content, re.I)
        if match:
            return match.group(1)
        # Look for any external link that looks like a company site
        match = re.search(r'href="(https?://(?:www\.)?[^"]+\.(?:fr|com|eu|org))"', content)
        if match and 'gouv.fr' not in match.group(1) and 'data.gouv' not in match.group(1):
            return match.group(1)
    return None

def search_for_website(company_name):
    """Search for company website using DuckDuckGo HTML."""
    query = urllib.parse.quote(f"{company_name} formation site officiel")
    url = f"https://html.duckduckgo.com/html/?q={query}"
    content = fetch_url(url)
    if content:
        # Find first result that looks like a company website
        matches = re.findall(r'href="(https?://(?:www\.)?[^"]+\.(?:fr|com|eu|org)[^"]*)"', content)
        for match in matches[:5]:
            if 'duckduckgo' not in match and 'facebook' not in match and 'linkedin' not in match:
                return match
    return None

def extract_qualiopi_dates(content):
    """Extract Qualiopi-related dates from page content."""
    content_lower = content.lower()
    
    if 'qualiopi' not in content_lower:
        return None, None
    
    dates_found = []
    
    for pattern in DATE_PATTERNS:
        matches = re.findall(pattern, content_lower, re.IGNORECASE)
        for match in matches:
            dates_found.append(match)
    
    # Try to determine certification date vs expiry date
    cert_date = None
    expiry_date = None
    
    for date_str in dates_found:
        # Check context
        if any(word in content_lower[max(0, content_lower.find(date_str)-50):content_lower.find(date_str)+len(date_str)+50] 
               for word in ['depuis', 'certifié', 'obtenu', 'délivré']):
            cert_date = date_str
        elif any(word in content_lower[max(0, content_lower.find(date_str)-50):content_lower.find(date_str)+len(date_str)+50]
                 for word in ['jusqu', 'expir', 'validité', 'fin']):
            expiry_date = date_str
    
    # If we only found one date and it's a year, assume it's cert year
    if not cert_date and not expiry_date and dates_found:
        cert_date = dates_found[0]
    
    return cert_date, expiry_date

def scrape_prospect(prospect):
    """Scrape a single prospect for Qualiopi info."""
    result = {
        'siren': prospect.get('SIREN', ''),
        'name': prospect.get('Nom', ''),
        'website': None,
        'qualiopi_cert_date': None,
        'qualiopi_expiry_date': None,
        'status': 'pending'
    }
    
    siren = prospect.get('SIREN', '').strip()
    name = prospect.get('Nom', '').strip()
    
    if not siren and not name:
        result['status'] = 'no_identifier'
        return result
    
    # Step 1: Find website
    website = None
    if siren:
        website = find_website_from_siren(siren)
    if not website and name:
        website = search_for_website(name)
    
    if not website:
        result['status'] = 'no_website_found'
        return result
    
    result['website'] = website
    
    # Step 2: Fetch main page
    content = fetch_url(website)
    if not content:
        result['status'] = 'website_unreachable'
        return result
    
    # Step 3: Look for Qualiopi info on main page
    cert_date, expiry_date = extract_qualiopi_dates(content)
    
    # Step 4: If not found, try common subpages
    if not cert_date and not expiry_date:
        subpages = ['/qualiopi', '/certification', '/qualite', '/about', '/a-propos', '/qui-sommes-nous']
        base_url = website.rstrip('/')
        for subpage in subpages:
            sub_content = fetch_url(base_url + subpage)
            if sub_content:
                cert_date, expiry_date = extract_qualiopi_dates(sub_content)
                if cert_date or expiry_date:
                    break
            time.sleep(0.5)  # Be polite
    
    result['qualiopi_cert_date'] = cert_date
    result['qualiopi_expiry_date'] = expiry_date
    
    if cert_date or expiry_date:
        result['status'] = 'found_dates'
    else:
        result['status'] = 'no_dates_found'
    
    return result

def main():
    """Main scraping loop."""
    # Load prospects
    csv_path = '/root/obsidian-vault/LifeOS/Work/TeachInspire-Prospects.csv'
    
    prospects = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        prospects = list(reader)
    
    print(f"Loaded {len(prospects)} prospects")
    
    # Process first 20 as a test
    results = []
    for i, prospect in enumerate(prospects[:20]):
        print(f"\n[{i+1}/20] Processing: {prospect.get('Nom', 'Unknown')}")
        result = scrape_prospect(prospect)
        results.append(result)
        print(f"  Status: {result['status']}")
        if result['website']:
            print(f"  Website: {result['website']}")
        if result['qualiopi_cert_date']:
            print(f"  Cert date: {result['qualiopi_cert_date']}")
        if result['qualiopi_expiry_date']:
            print(f"  Expiry date: {result['qualiopi_expiry_date']}")
        time.sleep(1)  # Rate limiting
    
    # Save results
    output_path = '/tmp/qualiopi_scrape_results.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n\nResults saved to {output_path}")
    
    # Summary
    found = sum(1 for r in results if r['status'] == 'found_dates')
    no_website = sum(1 for r in results if r['status'] == 'no_website_found')
    no_dates = sum(1 for r in results if r['status'] == 'no_dates_found')
    
    print(f"\nSummary:")
    print(f"  Found dates: {found}")
    print(f"  No website found: {no_website}")
    print(f"  Website but no dates: {no_dates}")

if __name__ == '__main__':
    main()
