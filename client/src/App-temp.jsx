          <header className="header">
            <div className="header-left">
              <button
                className="sidebar-toggle"
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setMobileMenuOpen(mobileMenuOpen === 'sidebar' ? false : 'sidebar')
                  } else {
                    setSidebarCollapsed(!sidebarCollapsed)
                  }
                }}
                title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <div className="header-center">
              <div className="logo">
                <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" />
                <h1 className="gradient-text">Supreme Lottery</h1>
              </div>
            </div>

            <div className="header-controls">
              <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                <span className="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
              </button>
              <div className="user-profile-dropdown">
                <button className="profile-btn" onClick={() => setMobileMenuOpen(mobileMenuOpen === 'profile' ? false : 'profile')}>
                  <div className="profile-icon">
                    {user?.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="profile-pic-image" />
                    ) : (
                      <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                </button>
                <div className={`profile-dropdown ${mobileMenuOpen === 'profile' ? 'open' : ''}`}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('profile'); setMobileMenuOpen(false) }}>⚙️ Account Setup</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false) }}>🚪 Logout</a>
                </div>
              </div>
            </div>
          </header>
