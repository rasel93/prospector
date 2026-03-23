import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    try:
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, "html.parser")

        title = soup.title.string if soup.title else "No title"

        emails = []
        for a in soup.find_all("a"):
            href = a.get("href", "")
            if "mailto:" in href:
                emails.append(href.replace("mailto:", ""))

        return {
            "url": url,
            "title": title,
            "emails": emails
        }
    except Exception as e:
        return {"error": str(e)}
