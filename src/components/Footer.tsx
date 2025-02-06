export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} PetCare. All rights reserved.</p>
      <div className="social-icons">
        {/* <a href="#"><img src="/social-icons/facebook.png" alt="Facebook" /></a>
        <a href="#"><img src="/social-icons/twitter.png" alt="Twitter" /></a>
        <a href="#"><img src="/social-icons/instagram.png" alt="Instagram" /></a> */}
      </div>
    </footer>
  );
}
