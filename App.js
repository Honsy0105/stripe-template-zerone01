const subLinks = [
  {
    page: 'products',
    links: [
      { label: 'payment', icon: 'fa-credit-card', url: 'products.html' },
      { label: 'terminal', icon: 'fa-credit-card', url: 'products.html' },
      { label: 'connect', icon: 'fa-credit-card', url: 'products.html' },
    ],
  },
  {
    page: 'developers',
    links: [
      { label: 'plugins', icon: 'fa-book', url: 'products.html' },
      { label: 'libraries', icon: 'fa-book', url: 'products.html' },
      { label: 'plugins', icon: 'fa-book', url: 'products.html' },
      { label: 'billing', icon: 'fa-book', url: 'products.html' },
    ],
  },
  {
    page: 'company',
    links: [
      { label: 'about', icon: 'fa-briefcase', url: 'products.html' },
      { label: 'customers', icon: 'fa-briefcase', url: 'products.html' },
    ],
  },
];

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) {
    return element
  } 
  throw new Error(
    `Please check ${selection} selector, There is an Error`
  )
}


const sidebarWrapper = getElement('.sidebar-wrapper')
const sidebar = getElement('.sidebar')
const linkBtns = [...document.querySelectorAll('.link-btn')]
const contentCenter = getElement('.content')
const nav = getElement('.nav')
const submenu = getElement('.submenu')
const toggleNav = getElement('.toggle-btn')
const closeSidebar = getElement('.close-btn')

toggleNav.addEventListener('click', () => {
  sidebarWrapper.classList.add('show')
})
closeSidebar.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show')
})

linkBtns.forEach(btn => {
  btn.addEventListener('mouseover', (e) => {
    const text = e.currentTarget.textContent
    const tempBtn = e.currentTarget.getBoundingClientRect()
    const center = (tempBtn.right + tempBtn.left) / 2
    const bottom = tempBtn.bottom - 3

    const tempPage = subLinks.find(link => link.page === text)
    if (tempPage) {
      const { page, links } = tempBtn
      submenu.classList.add('show')
      submenu.style.top = `${bottom}px`
      submenu.style.right = `${center}px`

      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3'
      }
      if (links.length > 3) {
        columns = 'col-4'
      }

      submenu.innerHTML = `<article>
        <p>${page} </p>
        <div class="submenu-links ${columns}">
          ${links.map(link => {
        `<a href="${link.url} " class="link-btn"><i class="fas ${link.icon}"></i>${link.label} </a>`
      }).join('')
        }
        </div>
      </article>`
    }
  })
})

sidebar.innerHTML = subLinks.map(item => {
  const { page, links } = item
  return `<article>
    <p>${page}</p>
    <div class="sidebar-links">
    ${links.map(link => {
    return `
        <a href="${link.url}"><i class="fas ${link.icon}"></i>${link.label} </a>`
  }).join('')
    }
    </div>
  </article>
    `;
}).join('')


nav.addEventListener('mouseover', (e) => {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show')
  }
})
contentCenter.addEventListener('mouseover', () => {
  submenu.classList.remove('show')
})

