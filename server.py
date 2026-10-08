import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("   🚀 ALPRO-LAB: PLATFORM BELAJAR C++ ALPRODAS (MODUL 1-3) 🚀")
        print("=" * 60)
        print(f" Web server aktif di : {url}")
        print(" Buka browser Anda dan akses tautan di atas.")
        print(" Tekan CTRL+C di jendela ini untuk menghentikan server.")
        print("=" * 60)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer dihentikan. Sampai jumpa di praktikum!")
            sys.exit(0)

if __name__ == "__main__":
    run()
