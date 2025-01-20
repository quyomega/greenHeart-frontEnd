import "../assets/css/Header.css";
function Header({
    toggleLogoutButton,
    isMenuOpen,
    showLogout,
    goToUserDetails,
    handleLogout,
  }) {
    return (
      <header className="dashboard-header header">
        <h1>Xin chào </h1>
        <button
          style={{ color: "white", border: "none" }}
          className="hamburger-btn"
          onClick={toggleLogoutButton}
        >
        <i className={`bi-list ${isMenuOpen ? "rotate-90" : ""}`} />
        </button>
        <div className={`logout-btn-container ${showLogout ? "show" : ""}`}>
          <button className="details-btn" onClick={goToUserDetails}>
            Thông tin tài khoản
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </header>
    );
  }
  

export default Header;
