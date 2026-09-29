import boothPhoto from '../assets/img/Gambar2.webp'
import soesSmall from '../assets/img/Gambar3-600.webp'
import soesPhoto from '../assets/img/Gambar3.webp'
import boluJadulSmall from '../assets/img/bolu-jadul-600.webp'
import boluJadulPhoto from '../assets/img/bolu-jadul.webp'
import fruitPieSmall from '../assets/img/fruit-pie-600.webp'
import fruitPiePhoto from '../assets/img/fruit-pie.webp'
import risolSmall from '../assets/img/risol-600.webp'
import risolPhoto from '../assets/img/risol.webp'
import breadSmall from '../assets/img/soft-bread-600.webp'
import breadPhoto from '../assets/img/soft-bread.webp'

export const photos = {
  soes: soesPhoto,
  fruitPieSmall,
  booth: boothPhoto,
}

const whatsappNumber = '6281188809117'

export function whatsappLink(message) {
  const text = encodeURIComponent(message)
  const webUrl = `https://wa.me/${whatsappNumber}?text=${text}`
  if (!/Android/i.test(navigator.userAgent)) return webUrl
  return `intent://send/?phone=${whatsappNumber}&text=${text}#Intent;scheme=whatsapp;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`
}

export const orderHref = '#order'

export const contact = {
  whatsappDisplay: '0811 8880 9117',
  whatsappUrl: whatsappLink('Hi ZieSweets, I would like to place an order.'),
  instagramHandle: '@Zie_Sweets',
  instagramUrl: 'https://www.instagram.com/zie_sweets/',
}

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

export const values = ['Quality ingredients', 'Soft textures', 'Sweet flavours', 'Special moments', 'Everyday treats']

const srcSet = (small, large, width) => `${small} 600w, ${large} ${width}w`

const shots = {
  soes: {
    image: soesPhoto,
    srcSet: srcSet(soesSmall, soesPhoto, 1067),
    imagePosition: '60% 78%',
    alt: 'ZieSweets soes on a white plate, two halves showing the rum fla filling',
  },
  pieBuah: {
    image: fruitPiePhoto,
    srcSet: srcSet(fruitPieSmall, fruitPiePhoto, 1067),
    imagePosition: '50% 80%',
    alt: 'Two ZieSweets fruit pies with strawberry, orange and kiwi on a wooden board, a boxed set behind them',
  },
  rotiCokelat: {
    image: breadPhoto,
    srcSet: srcSet(breadSmall, breadPhoto, 1066),
    imagePosition: '50% 78%',
    alt: 'Two golden ZieSweets bread rolls with chocolate sprinkles on a wooden board, a full box behind them',
  },
  risol: {
    image: risolPhoto,
    srcSet: srcSet(risolSmall, risolPhoto, 1600),
    imagePosition: '55% 80%',
    alt: 'Two golden ZieSweets risol on a wooden board, a box of three behind them',
  },
  boluJadul: {
    image: boluJadulPhoto,
    srcSet: srcSet(boluJadulSmall, boluJadulPhoto, 1067),
    imagePosition: '50% 80%',
    alt: 'A slice of ZieSweets bolu jadul topped half with grated cheese and half with chocolate sprinkles',
  },
}

export const products = [
  {
    name: 'Soes',
    bestSeller: true,
    category: 'Pastry',
    price: 8000,
    description: 'Light choux pastry filled with smooth, creamy fla with a hint of rum.',
    ...shots.soes,
    featured: true,
    showcase: true,
  },
  {
    name: 'Pie Buah',
    bestSeller: true,
    category: 'Pastry',
    price: 9000,
    description: 'Crisp tart shells filled with our rum fla, topped with strawberry, orange and kiwi.',
    ...shots.pieBuah,
    showcase: true,
  },
  { name: 'Rhumhorn', category: 'Pastry', price: 7000, description: 'Flaky horn-shaped pastry with a creamy rum filling.' },
  { name: 'Roti Keju', category: 'Bread', price: 7000, description: 'Soft bread roll topped with cheese.', bestSeller: true },
  {
    name: 'Roti Cokelat',
    bestSeller: true,
    category: 'Bread',
    price: 7000,
    description: 'Soft, golden bread rolls with a glossy top and chocolate sprinkles.',
    ...shots.rotiCokelat,
    showcase: true,
  },
  { name: 'Roti Ayam Jamur', category: 'Bread', price: 10000, description: 'Soft bread roll filled with chicken and mushroom.', bestSeller: true },
  { name: 'Roti Smoked Beef Cheese', category: 'Bread', price: 10000, description: 'Soft bread roll with smoked beef and cheese.', bestSeller: true },
  { name: 'Roti Abon', category: 'Bread', price: 10000, description: 'Soft bread roll topped with savoury meat floss.', bestSeller: true },
  { name: 'Puding Kelapa', category: 'Sweets', price: 12000, description: 'Made with 100% young coconut water — no added water.' },
  {
    name: 'Risol Mayo Smoked Beef',
    bestSeller: true,
    category: 'Savoury',
    price: 8000,
    description: 'Crispy breaded crêpe roll filled with smoked beef and mayonnaise.',
    ...shots.risol,
    showcase: true,
  },
  {
    name: 'Risol Ragout',
    bestSeller: true,
    category: 'Savoury',
    price: 8000,
    description: 'Crispy breaded crêpe roll filled with creamy ragout.',
    ...shots.risol,
  },
  { name: 'Lemper Ayam', category: 'Savoury', price: 8000, description: 'Sticky rice rolled around savoury shredded chicken.' },
  { name: 'Macaroni Schotel Beef', category: 'Savoury', price: 40000, description: 'Baked macaroni with beef.', bestSeller: true },
  { name: 'Pastel Tutup', category: 'Savoury', price: 40000, description: 'Savoury filling baked under a mashed potato top.' },
  {
    name: 'Bolu Jadul',
    category: 'Cake',
    price: 150000,
    size: '24 × 24 cm',
    description: 'Old-fashioned sponge cake topped with grated cheese and chocolate sprinkles.',
    ...shots.boluJadul,
    showcase: true,
  },
  { name: 'Panekuk Vanila', category: 'Sweets', price: 7000, description: 'Soft pancake with vanilla fla.' },
  { name: 'Panekuk Pandan', category: 'Sweets', price: 7000, description: 'Soft pancake with pandan fla.' },
  { name: 'Panekuk Cokelat', category: 'Sweets', price: 8000, description: 'Soft pancake with chocolate fla.' },
  { name: 'Dadar Gulung', category: 'Sweets', price: 6000, description: 'Pandan crêpe rolled around sweet grated coconut.' },
  {
    name: 'Talam Srikaya',
    category: 'Cake',
    price: 150000,
    size: '22 × 22 cm',
    description: 'Steamed layered cake topped with srikaya custard.',
  },
]

export const showcaseProducts = products.filter((p) => p.showcase)

export const marqueeItems = ['Freshly baked everyday', ...showcaseProducts.map((p) => p.name), 'Since 2016']

export const stats = [
  { value: String(new Date().getFullYear() - 2016), label: 'Years of baking' },
  { value: String(products.length), label: 'Treats on the menu' },
  { value: '1K+', label: 'Happy customers' },
]

export const reviews = [
  {
    name: 'P•••••e',
    quote: 'Baru selesai pestanya, snacknya disantap — aman, enak dan mantap. Enak-enak semua snack hari ini!',
  },
  {
    name: 'E••k',
    quote: 'Macaroninya cocok, kata anak enak!',
    product: 'Macaroni Schotel Beef',
  },
  {
    name: 'M•••a',
    quote: 'Wuah daebak, masih tetap enak! Belum makan siang, dapat kiriman langsung habis 3 — cici saya 2. Wkwkwk.',
  },
  {
    name: 'H•••y',
    quote: 'Kue talam ketan hijaunya kayak kue Pontianak. Risol ragout-nya juga enak!',
    product: 'Risol Ragout',
  },
  {
    name: 'G•••e',
    quote: 'Astaga lupa… udah keburu dimakan, hahaha. Enak as usual!',
  },
  {
    name: 'M••a',
    quote: 'Kalau fruit pie saya udah coba, enak. Mau pesan fruit pie isi 9 pcs ya!',
    product: 'Pie Buah',
  },
  {
    name: 'E••••r',
    quote: 'Bikin list kue-kuenya lagi dong plus harganya, saya share ke komunitas. Lapis/talam ijonya enak!',
  },
  {
    name: 'A••••a',
    quote: 'Makasih ci, enak semua!',
  },
]
