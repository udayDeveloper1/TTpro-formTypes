import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/logo.webp'

export const Slidebar = () => {
  let location = useLocation()
  let path = '/' + location?.pathname?.split('/')?.[1]
  const [expanded, setExpanded] = useState(false)

  const toggleMenu = menuName => {
    setExpanded(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }))
  }

  return (
    <>
      <aside className='left-sidebar'>
        {/* Sidebar scroll*/}
        <div>
          <div className='brand-logo d-flex align-items-center justify-content-between'>
            <Link
              to={'/tcType1Form'}
              className='text-nowrap logo-img text-center d-flex m-3 ms-5'
            >
              <img src={Logo} className='dark-logo' height={100}
                width={100} alt="" />
            </Link>

            <div
              className='close-btn d-lg-none d-block sidebartoggler cursor-pointer'
              id='sidebarCollapse'
            >
              <i className='ti ti-x fs-8 text-muted' />
            </div>
          </div>
          {/* Sidebar navigation*/}
          <nav className='sidebar-nav scroll-sidebar' data-simplebar>
            <ul id='sidebarnav'>
              <li
                className={`sidebar-item cursor-pointer ${[
                    '/tcType1Form',
                    '/tcType1List',
                    '/importPdfTCtype1',
                    '/tcType1View'
                  ].includes(path)
                    ? 'selected'
                    : ''
                  }`}
              >

                <a
                  className={`sidebar-link has-arrow ${[
                      '/tcType1Form',
                      '/tcType1List',
                      '/importPdfTCtype1',
                      '/tcType1View'
                    ].includes(path)
                      ? 'active'
                      : ''
                    }`}
                  onClick={() => toggleMenu('form_1')}
                >
                  <span>
                    <i className='ti ti-user-circle me-1 fs-6' />
                  </span>
                  <span className='hide-menu'>Transaction Certificate</span>
                </a>

                {/* Submenu */}
                {expanded['form_1'] && (
                  <ul className='submenu'>
                    <li className='sidebar-item'>
                      <Link
                        to='/tcType1List'
                        className={`sidebar-link ${path === '/tcType1List' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                          {/* <i className="ti ti-circle" /> */}
                        </div>
                        <span className='hide-menu'>List</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/tcType1Form'
                        className={`sidebar-link ${path === '/tcType1Form' || path === '/'
                            ? 'active'
                            : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                          {/* <i className="ti ti-circle" /> */}
                        </div>
                        <span className='hide-menu'>Add Form</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/importPdfTCtype1'
                        className={`sidebar-link ${path === '/importPdfTCtype1' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                          {/* <i className="ti ti-circle" /> */}
                        </div>
                        <span className='hide-menu'>Add Pdf form</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* <li
                className={`sidebar-item cursor-pointer ${
                  [
                    '/tcType2Form',
                    '/tcType2List',
                    '/importPdfTCtype2',
                    '/tcType2View'
                  ].includes(path) && path != '/'
                    ? 'selected'
                    : ''
                }`}
              >
                <a
                  className={`sidebar-link has-arrow ${
                    [
                      '/tcType2Form',
                      '/tcType2List',
                      '/importPdfTCtype2',
                      '/tcType2View'
                    ].includes(path)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => toggleMenu('form_2')}
                >
                  <span>
                    <i className='ti ti-user-circle me-1 fs-6' />
                  </span>
                  <span className='hide-menu'>
                    Transaction Certificate (Type 2)
                  </span>
                </a>

                {expanded['form_2'] && (
                  <ul className='submenu'>
                    <li className='sidebar-item'>
                      <Link
                        to='/tcType2List'
                        className={`sidebar-link ${
                          path === '/tcType2List' ? 'active' : ''
                        }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>List</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/tcType2Form'
                        className={`sidebar-link ${
                          path === '/tcType2Form' ? 'active' : ''
                        }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>Add Form</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/importPdfTCtype2'
                        className={`sidebar-link ${
                          path === '/importPdfTCtype2' ? 'active' : ''
                        }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>Add Pdf form</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li> */}

              <li
                className={`sidebar-item cursor-pointer ${[
                    '/scopeVerificationForm',
                    '/scopeVerificationList',
                    '/importPdfScopeVerification',
                    '/scopeVerificationView',
                    '/'
                  ].includes(path)
                    ? 'selected'
                    : ''
                  }`}
              >
                <a
                  className={`sidebar-link has-arrow ${[
                      '/scopeVerificationForm',
                      '/scopeVerificationList',
                      '/importPdfScopeVerification',
                      '/scopeVerificationView',
                    ].includes(path)
                      ? 'active'
                      : ''
                    }`}
                  onClick={() => toggleMenu('form_3')}
                >
                  <span>
                    <i className='ti ti-user-circle me-1 fs-6' />
                  </span>
                  <span className='hide-menu'>Scope Certification Form</span>
                </a>

                {/* Submenu */}
                {expanded['form_3'] && (
                  <ul className='submenu'>
                    <li className='sidebar-item'>
                      <Link
                        to='/scopeVerificationList'
                        className={`sidebar-link ${path === '/scopeVerificationList' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                          {/* <i className="ti ti-circle" /> */}
                        </div>
                        <span className='hide-menu'>List</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/scopeVerificationForm'
                        className={`sidebar-link ${path === '/scopeVerificationForm' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                          {/* <i className="ti ti-circle" /> */}
                        </div>
                        <span className='hide-menu'>Add Form</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/importPdfScopeVerification'
                        className={`sidebar-link ${path === '/importPdfScopeVerification' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                          {/* <i className="ti ti-circle" /> */}
                        </div>
                        <span className='hide-menu'>Add Pdf form</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>


              {/* <li
                className={`sidebar-item cursor-pointer ${[
                    '/handlingTradingScTypeForm_v3_0',
                    '/handlingTradingScTypeList_v3_0',
                    '/importPdfhandlingTradingScType_v3_0',
                    '/handlingTradingScTypeView_v3_0'
                  ].includes(path)
                    ? 'selected'
                    : ''
                  }`}
              >
                <a
                  className={`sidebar-link has-arrow ${[
                      '/handlingTradingScTypeForm_v3_0',
                      '/handlingTradingScTypeList_v3_0',
                      '/importPdfhandlingTradingScType_v3_0',
                      '/handlingTradingScTypeView_v3_0'
                    ].includes(path)
                      ? 'active'
                      : ''
                    }`}
                  onClick={() => toggleMenu('form_4')}
                >
                  <span>
                    <i className='ti ti-user-circle me-1 fs-6' />
                  </span>
                  <span className='hide-menu'>Scope Certificate VERSION 3.0</span>
                </a>

                {expanded['form_4'] && (
                  <ul className='submenu'>
                    <li className='sidebar-item'>
                      <Link
                        to='/handlingTradingScTypeList_v3_0'
                        className={`sidebar-link ${path === '/handlingTradingScTypeList_v3_0' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>List</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/handlingTradingScTypeForm_v3_0'
                        className={`sidebar-link ${path === '/handlingTradingScTypeForm_v3_0' ? 'active' : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>Add Form</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/importPdfhandlingTradingScType_v3_0'
                        className={`sidebar-link ${path === '/importPdfhandlingTradingScType_v3_0'
                            ? 'active'
                            : ''
                          }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>Add Pdf form</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li> */}

              {/* <li
                className={`sidebar-item ${
                  [
                    '/handlingTradingScTypeForm',
                    '/handlingTradingScTypeList',
                    '/importPdfhandlingTradingScType',
                    '/handlingTradingScTypeView'
                  ].includes(path)
                    ? 'selected'
                    : ''
                }`}
              >
                <a
                  className={`sidebar-link has-arrow ${
                    [
                      '/handlingTradingScTypeForm',
                      '/handlingTradingScTypeList',
                      '/importPdfhandlingTradingScType',
                      '/handlingTradingScTypeView'
                    ].includes(path)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => toggleMenu('form_5')}
                >
                  <span>
                    <i className='ti ti-user-circle me-1 fs-6' />
                  </span>
                  <span className='hide-menu'>Handling and Trading</span>
                </a>

                {expanded['form_5'] && (
                  <ul className='submenu'>
                    <li className='sidebar-item'>
                      <Link
                        to='/handlingTradingScTypeList'
                        className={`sidebar-link ${
                          path === '/handlingTradingScTypeList' ? 'active' : ''
                        }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>List</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/handlingTradingScTypeForm'
                        className={`sidebar-link ${
                          path === '/handlingTradingScTypeForm' ? 'active' : ''
                        }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>Add Form</span>
                      </Link>
                    </li>
                    <li className='sidebar-item'>
                      <Link
                        to='/importPdfhandlingTradingScType'
                        className={`sidebar-link ${
                          path === '/importPdfhandlingTradingScType'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <div className='round-16 d-flex align-items-center justify-content-center'>
                        </div>
                        <span className='hide-menu'>Add Pdf form</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li> */}
            </ul>
          </nav>

          <div className='fixed-profile p-3 bg-light-secondary rounded sidebar-ad mt-3'>
            <div className='hstack gap-3'>
              <div className='john-img'>
                <img
                  src='../../dist/images/profile/user-1.jpg'
                  className='rounded-circle'
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className='john-title'>
                <h6 className='mb-0 fs-4 fw-semibold'>Mathew</h6>
                <span className='fs-2 text-dark'>Designer</span>
              </div>
              <button
                className='border-0 bg-transparent text-primary ms-auto'
                tabIndex={0}
                type='button'
                aria-label='logout'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                data-bs-title='logout'
              >
                <i className='ti ti-power fs-6' />
              </button>
            </div>
          </div>

          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>

      
    </>
  )
}
