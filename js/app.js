import { UI } from './UI.js';
import { API } from './api.js';

const TAB_ELEMENTS = Array.from(document.querySelectorAll('.contacts-app__tabs-tab'));
const TABS = { favorites: 0, all: 1 }; // favorites and all tabs

const contactList = document.getElementById('contact-list');
const showSearchButton = document.getElementById('show-search-btn');
const searchInput = document.getElementById('contactSearchInput');

document.addEventListener('DOMContentLoaded', loadApp);
showSearchButton.addEventListener('click', UI.toggleSearchBox);
searchInput.addEventListener('keyup', searchUser);



function loadApp() {
  UI.responsiveList(); // set dynamic height to list

  API.fetchUsers()
    .then(({ results: users }) => UI.loadContacts(users)) // load contact elements to UI 
    .then(() => feather.replace()) // feather.icons cdn
    .then(() =>  // add to favorite button
    {
      const addToFavoriteBTN = Array.from(
        document.getElementsByClassName('add-to-favorite')
      );

      addToFavoriteBTN.map((e) =>
        e.addEventListener('click', UI.toggleFavorite)
      );
    });

  UI.loadSelectedTabs(); // load selected tabs
  UI.loadScreen( // load screen when it's loaded
    Object.keys(TABS)[Object.keys(TABS).findIndex((e) => TABS[e] == 1)]
  );

  tabClickHandler(); // tab menu click handler
}

function searchUser(e) {
  const contactElements = Array.from(contactList.children);

  const filtered = contactElements.filter(
    (contact) => contact.getAttribute('data-fullname').toLowerCase().includes(e.target.value)
  );
  const rest = contactElements.filter(
    (contact) => !contact
                  .getAttribute('data-fullname')
                  .toLowerCase()
                  .includes(e.target.value)
  );

  if (e.target.value !== '' || e.target.value !== ' ') {
    filtered.map((el) => {
      el.style.display = 'flex';
    });
    rest.map((el) => {
      el.style.display = 'none';
    });
  }

  e.preventDefault();
}

function tabClickHandler() {
  TAB_ELEMENTS.map((tab) => {
    tab.addEventListener('click', ({ target: el }) => {
      if (tab.getAttribute('data-active') == '1') {
        !el.classList.contains('contacts-app__tabs-tab--active') &&
          el.classList.add('contacts-app__tabs-tab--active');
      } else {
        TAB_ELEMENTS.map((a) => {
          a.classList.remove('contacts-app__tabs-tab--active');
          a.setAttribute('data-active', '0');
          TABS[a.getAttribute('data-tab-name')] = 0;
        });

        el.classList.add('contacts-app__tabs-tab--active');
        el.setAttribute('data-active', '1');
        TABS[el.getAttribute('data-tab-name')] = 1;

        UI.loadScreen(el.getAttribute('data-tab-name'));

        return 1;
      }
    });
  });
}
