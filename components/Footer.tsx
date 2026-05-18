export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ref-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">Exclusive<em>.</em>Doors</div>
          <p className="footer-tagline">
            Importator unic de uși germane premium. Showroom în Otopeni, Ilfov.
            Consultanță gratuită pentru proprietari și arhitecți.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Produse</span>
          <a href="/products/interior">Uși Interior</a>
          <a href="/products/exterior">Uși Exterior</a>
          <a href="/products/glisante">Sticlă Securizată</a>
          <a href="/products/pivotante">Tehnice &amp; Garaj</a>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Servicii</span>
          <a href="#contact">Consultanță gratuită</a>
          <a href="#contact">Măsurători</a>
          <a href="#contact">Montaj profesional</a>
          <a href="#contact">Parteneri arhitecți</a>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Companie</span>
          <a href="#contact">Showroom Otopeni</a>
          <a href="/portofoliu">Proiecte realizate</a>
          <a href="https://www.facebook.com/exclusivedoors.ro/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/exclusivedoors.ro/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {year} Exclusive Doors Style SRL · Drumul Gării Odăi 1A, Otopeni, Ilfov</div>
        <div>0728 959 652 · office@exclusivedoors.ro</div>
      </div>
    </footer>
  );
}
