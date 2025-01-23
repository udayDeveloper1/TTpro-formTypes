import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.webp";

export const Slidebar = () => {
  let location = useLocation();
  let path = "/" + location?.pathname?.split("/")?.[1];
  const [expanded, setExpanded] = useState(false);

    const toggleMenu = (menuName) => {
        setExpanded((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };
  return (
    <>
      <aside className="left-sidebar">
        {/* Sidebar scroll*/}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link
              to={"/"}
              className="text-nowrap logo-img text-center d-flex m-3 ms-5"
            >
              <img src={Logo} className="dark-logo" width={100} alt />
            </Link>

            {/* <img src={PUBLIC_URL + "/dist/images/logo.svg"} className="dark-logo p-2 m-2 " width={60} alt /> */}
            {/* <img src={PUBLIC_URL + "/dist/images/logos/light-logo.svg"} className="light-logo" width={180} alt /> */}
            {/* </Link> */}

            {/* <Link to={'/'} className="text-nowrap logo-img text-center d-flex header_logo">
                            <img src={PUBLIC_URL + "/dist/images/logo.svg"} className="dark-logo p-2 m-2 " width={60} alt />
                        </Link> */}

            <div
              className="close-btn d-lg-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8 text-muted" />
            </div>
          </div>
          {/* Sidebar navigation*/}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar>
            <ul id="sidebarnav">
              {/* ============================= */}
              {/* Home */}
              {/* ============================= */}

              {/* =================== */}
              {/* Dashboard */}
              {/* =================== */}

              <li
                className={`sidebar-item ${
                  path === "/tcType1Form" || path === "/" ? "selected" : ""
                }`}
              >
                <Link
                  to={"/tcType1Form"}
                  className={`sidebar-link ${
                    path === "/tcType1Form" || path === "/" ? "active" : ""
                  }`}
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-aperture me-1 fs-6" />
                  </span>
                  <span className="hide-menu">Form 1</span>
                </Link>
              </li>

              <li
                className={`sidebar-item ${
                  path === "/tcType2Form" ? "selected" : ""
                }`}
              >
                <Link
                  to={"/tcType2Form"}
                  className={`sidebar-link ${
                    path === "/tcType2Form" ? "active" : ""
                  }`}
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-user-circle me-1 fs-6" />
                  </span>
                  <span className="hide-menu">Form 2</span>
                </Link>
              </li>

              <li
                className={`sidebar-item ${
                  path === "/scopeVerificationForm" ? "selected" : ""
                }`}
              >
                <Link
                  to={"/scopeVerificationForm"}
                  className={`sidebar-link ${
                    path === "/scopeVerificationForm" ? "active" : ""
                  }`}
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-user-circle me-1 fs-6" />
                  </span>
                  <span className="hide-menu">Form 3</span>
                </Link>
              </li>

              <li
                className={`sidebar-item ${
                  path === "/tCTypeCropProductionForm" ? "selected" : ""
                }`}
              >
                <Link
                  to={"/tCTypeCropProductionForm"}
                  className={`sidebar-link ${
                    path === "/tCTypeCropProductionForm" ? "active" : ""
                  }`}
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-user-circle me-1 fs-6" />
                  </span>
                  <span className="hide-menu">Form 4</span>
                </Link>
              </li>

              <li
                className={`sidebar-item ${
                  path === "/handlingTradingScTypeForm" ? "selected" : ""
                }`}
              >
                <Link
                  to={"/handlingTradingScTypeForm"}
                  className={`sidebar-link ${
                    path === "/handlingTradingScTypeForm" ? "active" : ""
                  }`}
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-user-circle me-1 fs-6" />
                  </span>
                  <span className="hide-menu">Form 5</span>
                </Link>
              </li>

              <li
                className={`sidebar-item ${
                  path === "/category_list" ||
                  path === "/sub_category_list" ||
                  path === "/child_category_list"
                    ? "selected"
                    : ""
                }`}
              >
                <a
                  className={`sidebar-link has-arrow ${
                    path === "/category_list" ||
                    path === "/sub_category_list" ||
                    path === "/child_category_list"
                      ? "active"
                      : ""
                  }`}
                  aria-expanded={expanded["category"] ? "true" : "false"}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    toggleMenu("category"); // Toggle menu state for "category"
                  }}
                >
                  <span>
                    <i className="ti ti-category me-1 fs-6" />
                  </span>
                  <span className="hide-menu">Form 5</span>
                </a>

                <ul
                  className={`collapse first-level ${
                    expanded["category"] ? "show" : ""
                  }`}
                  aria-expanded={expanded["category"] ? "true" : "false"}
                >
                  <li className="sidebar-item">
                    <Link
                      to={"/category_list"}
                      className={`sidebar-link ${
                        path === "/category_list" ? "active" : ""
                      }`}
                    >
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-circle" />
                      </div>
                      <span className="hide-menu">Category</span>
                    </Link>

                    <Link
                      to={"/sub_category_list"} // Use React Router's `Link` for navigation
                      className={`sidebar-link ${
                        path === "/sub_category_list" ? "active" : ""
                      }`}
                    >
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-circle" />
                      </div>
                      <span className="hide-menu">Sub category</span>
                    </Link>

                    <Link
                      to={"/child_category_list"} // Use React Router's `Link` for navigation
                      className={`sidebar-link ${
                        path === "/child_category_list" ? "active" : ""
                      }`}
                    >
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-circle" />
                      </div>
                      <span className="hide-menu">Child category</span>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* <li className={`sidebar-item ${path === "/customer_list" ? "selected" : ""}`}>
                                <Link to={'/customer_list'} className={`sidebar-link ${path === "/customer_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-user-circle me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Customer</span>
                                </Link>
                            </li>

                            <li className={`sidebar-item ${path === "/post_list" ? "selected" : ""}`}>
                                <Link to={'/post_list'} className={`sidebar-link ${path === "/post_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-photo-plus me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Post</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/streaming_list" ? "selected" : ""}`}>
                                <Link to={'/streaming_list'} className={`sidebar-link ${path === "/streaming_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-building-broadcast-tower me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Streaming</span>
                                </Link>
                            </li>

                            <li className={`sidebar-item ${path === "/category_list" ? "selected" : ""}`}>
                                <Link to={'/category_list'} className={`sidebar-link ${path === "/category_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-category me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Gift Category</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/sub_category_list" ? "selected" : ""}`}>
                                <Link to={'/sub_category_list'} className={`sidebar-link ${path === "/sub_category_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>

                                        <i className="ti ti-category-2 me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Gift Sub Category</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/gift" ? "selected" : ""}`}>
                                <Link to={'/gift'} className={`sidebar-link ${path === "/gift" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-gift me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Manage Gift</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/reported_content_list" ? "selected" : ""}`}>
                                <Link to={'/reported_content_list'} className={`sidebar-link ${path === "/reported_content_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-message-report me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Reported Content</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/notification_list" ? "selected" : ""}`}>
                                <Link to={'/notification_list'} className={`sidebar-link ${path === "/notification_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-bell-ringing me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Send Notification</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/advertise_list" ? "selected" : ""}`}>
                                <Link to={'/advertise_list'} className={`sidebar-link ${path === "/advertise_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-badge-ad me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Advertisements</span>
                                </Link>
                            </li> */}

              {/* <li className={`sidebar-item ${path === "/manage_sub_admin" ? "selected" : ""}`}>
                                <Link to={'/manage_sub_admin'} className={`sidebar-link ${path === "/manage_sub_admin" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-users me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Sub Admin (Confirm)</span>
                                </Link>
                            </li> */}

              {/* <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                <span className="hide-menu">Cms Pages</span>
                            </li>

                            <li className={`sidebar-item ${path === "/contact_us_list" ? "selected" : ""}`}>
                                <Link to={'/contact_us_list'} className={`sidebar-link ${path === "/contact_us_list" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-phone me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">Contact Us</span>
                                </Link>
                            </li>


                            <li className={`sidebar-item ${path === "/about-us" ? "selected" : ""}`}>
                                <Link to={'/about-us'} className={`sidebar-link ${path === "/about-us" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-help me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">About Us</span>
                                </Link>
                            </li>

                            <li className={`sidebar-item ${path === "/privacy-policy" ? "selected" : ""}`}>
                                <Link to={'/privacy-policy'} className={`sidebar-link ${path === "/privacy-policy" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i class="ti ti-shield-check me-1 fs-6"></i>

                                    </span>
                                    <span className="hide-menu">Privacy Policy</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${path === "/terms-condition" ? "selected" : ""}`}>
                                <Link to={'/terms-condition'} className={`sidebar-link ${path === "/terms-condition" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i class="ti ti-info-circle me-1 fs-6"></i>
                                    </span>
                                    <span className="hide-menu">Terms & Condition</span>
                                </Link>
                            </li>

                            <li className={`sidebar-item ${path === "/faq" ? "selected" : ""}`}>
                                <Link to={'/faq'} className={`sidebar-link ${path === "/faq" ? "active" : ""}`} aria-expanded="false">
                                    <span>
                                        <i className="ti ti-help me-1 fs-6" />
                                    </span>
                                    <span className="hide-menu">FAQ</span>
                                </Link>
                            </li> */}
            </ul>
          </nav>

          <div className="fixed-profile p-3 bg-light-secondary rounded sidebar-ad mt-3">
            <div className="hstack gap-3">
              <div className="john-img">
                <img
                  src="../../dist/images/profile/user-1.jpg"
                  className="rounded-circle"
                  width={40}
                  height={40}
                  alt
                />
              </div>
              <div className="john-title">
                <h6 className="mb-0 fs-4 fw-semibold">Mathew</h6>
                <span className="fs-2 text-dark">Designer</span>
              </div>
              <button
                className="border-0 bg-transparent text-primary ms-auto"
                tabIndex={0}
                type="button"
                aria-label="logout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="logout"
              >
                <i className="ti ti-power fs-6" />
              </button>
            </div>
          </div>

          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>
    </>
  );
};
