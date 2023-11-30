import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarLinkWithSubmenuProps {
  title: string;
  pathname: string;
  links: { to: string; text: string }[];
}

const SidebarLinkWithSubmenu = ({
  title,
  pathname,
  links,
}: SidebarLinkWithSubmenuProps) => {
  const [open, setOpen] = useState(false);
  const activeCondition = links.some((link) => link.to.includes(pathname));
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <NavLink
        to="#"
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${activeCondition && 'bg-graydark dark:bg-meta-4'
          }`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <svg width="18" height="18" className="fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M6.103.956H2.531C1.575.956.788 1.744.788 2.7v3.572c0 .956.787 1.744 1.743 1.744h3.572c.956 0 1.744-.788 1.744-1.744V2.728A1.724 1.724 0 006.103.956zM6.61 6.3a.504.504 0 01-.506.506H2.531a.504.504 0 01-.506-.506V2.728c0-.281.225-.506.506-.506h3.572c.281 0 .506.225.506.506V6.3zM15.469.956h-3.572c-.956 0-1.744.788-1.744 1.744v3.572c0 .956.788 1.744 1.744 1.744h3.572c.956 0 1.744-.788 1.744-1.744V2.728c0-.984-.788-1.772-1.744-1.772zm.506 5.344a.504.504 0 01-.506.506h-3.572a.504.504 0 01-.506-.506V2.728c0-.281.225-.506.506-.506h3.572c.281 0 .506.225.506.506V6.3zM6.103 9.928H2.531c-.956 0-1.743.788-1.743 1.744v3.572c0 .956.787 1.744 1.743 1.744h3.572c.956 0 1.744-.788 1.744-1.744V11.7a1.724 1.724 0 00-1.744-1.772zm.506 5.344a.504.504 0 01-.506.506H2.531a.504.504 0 01-.506-.506V11.7c0-.281.225-.506.506-.506h3.572c.281 0 .506.225.506.506v3.572zM15.469 9.928h-3.572c-.956 0-1.744.788-1.744 1.744v3.572c0 .956.788 1.744 1.744 1.744h3.572c.956 0 1.744-.788 1.744-1.744V11.7c0-.984-.788-1.772-1.744-1.772zm.506 5.344a.504.504 0 01-.506.506h-3.572a.504.504 0 01-.506-.506V11.7c0-.281.225-.506.506-.506h3.572c.281 0 .506.225.506.506v3.572z"/></svg>
        {title}
        <svg width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg"><path d="M4.411 6.91a.833.833 0 011.179 0L10 11.322l4.411-4.41a.833.833 0 111.179 1.178l-5 5a.833.833 0 01-1.179 0l-5-5a.833.833 0 010-1.178z"/></svg>
      </NavLink>
      {/* <!-- Dropdown Menu Start --> */}
      <div
        className={`translate transform overflow-hidden ${!open && 'hidden'}`}
      >
        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                  (isActive && '!text-white')
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* <!-- Dropdown Menu End --> */}
    </React.Fragment>
  );
};

export default SidebarLinkWithSubmenu;