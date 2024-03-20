function DropdownMenu({ setPopupVisibility }) {
  return (
    <div className="overflow-hidden bg-opacity-90 backdrop-filter backdrop-blur-xl absolute right-0 mt-2 w-56 origin-top-right rounded-s-md text-white shadow-lg focus:outline-none">
      <a
        href="#"
        className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black transition-all"
        role="menuitem"
        id="menu-item-0"
        onClick={setPopupVisibility}>
        Account settings
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black transition-all"
        role="menuitem"
        id="menu-item-1">
        Support
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black transition-all"
        role="menuitem"
        id="menu-item-2">
        License
      </a>
      <form method="POST" action="#" role="none">
        <button
          type="submit"
          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-3">
          Sign out
        </button>
      </form>
    </div>
  );
}

export default DropdownMenu;
