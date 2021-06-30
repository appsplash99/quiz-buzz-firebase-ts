import React, { useState } from 'react';
import { GrTechnology } from 'react-icons/gr';
// import { BtnIcon, NavbarResp1 } from 'morphine-ui/dist/index';
import { Link } from 'react-router-dom';

export const QuizBuzzNav = () => {
  return (
    <nav className="flex gap-2 h-8">
      <Link
        to="/quiz-categories"
        className="new-nav__link text-decoration--none my--sm text-align--c">
        Quiz-Categories
      </Link>
      <Link
        to="*"
        className="new-nav__link text-decoration--none my--sm text-align--c">
        Reset
      </Link>
    </nav>
  );
};

// export const QuizBuzzNav = () => {
//   const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

//   return (
//     <NavbarResp1
//       style={{
//         boxShadow: '0 2px 5px 1px rgb(64 60 67 / 16%)',
//         padding: '0 var(--space-sm)',
//         // backgroundColor: 'green',
//         zIndex: 2,
//       }}
//       showMobileMenu={showMobileNav}
//       handleShowMobileMenu={() => setShowMobileNav(!showMobileNav)}
//       desktopMenuStyle={{
//         height: '4rem',
//       }}
//       mobileMenuStyle={{
//         borderBottomRightRadius: 'var(--space-md)',
//         borderBottomLeftRadius: 'var(--space-md)',
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         backgroundColor: showMobileNav ? 'orange' : '',
//         height: '85vh',
//         width: '95vw',
//         margin: '0 auto',
//         display: 'block',
//         top: showMobileNav ? '5rem' : '-200%',
//         zIndex: 1,
//         opacity: showMobileNav ? 1 : 0,
//         // transition: 'top 0.2s ease-in-out, backgroundColor 0.2s ease-out',
//         transition: 'opacity 0.2s ease-in-out',
//       }}
//       navbarLogo={
//         <Link
//           to="/"
//           className="flex align-items--c new-nav__link text-decoration--none gap--xs"
//           style={{
//             marginRight: 'var(--space-md)',
//           }}>
//           <div className="flex flex--column align-items--fe justify-content--c gap--xxxxs">
//             <span className="font-weight--800">QUIZ</span>
//             <span className="font-weight--800">BUZZ</span>
//           </div>
//           <BtnIcon size="lg" style={{ height: '50px', width: '50px' }}>
//             <GrTechnology className="text--xxxl" />
//           </BtnIcon>
//         </Link>
//       }
//       navbarSearchIcon={<></>}>
//       <>
//         <Link
//           to="/quiz-categories"
//           className="new-nav__link text-decoration--none my--sm text-align--c">
//           Quiz-Categories
//         </Link>
//         <Link
//           to="*"
//           className="new-nav__link text-decoration--none my--sm text-align--c">
//           Reset
//         </Link>
//       </>
//     </NavbarResp1>
//   );
// };
