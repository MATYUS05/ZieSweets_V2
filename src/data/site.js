import boothPhoto from '../assets/img/Gambar2.jpg'
import soesPhoto from '../assets/img/Gambar3.jpg'
import boluJadulPhoto from '../assets/img/bolu-jadul.jpg'
import fruitPiePhoto from '../assets/img/fruit-pie.jpg'
import risolPhoto from '../assets/img/risol.jpg'
import breadPhoto from '../assets/img/soft-bread.jpg'
import { dummyCustomers, dummyReviews } from './dummy'

export const photos = {
  soes: soesPhoto,
  fruitPie: fruitPiePhoto,
  booth: boothPhoto,
}

const whatsappNumber = '6281188809117'
const whatsappText = encodeURIComponent('Hi ZieSweets, I would like to place an order.')
const whatsappWebUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`
const whatsappAndroidUrl = `intent://send/?phone=${whatsappNumber}&text=${whatsappText}#Intent;scheme=whatsapp;S.browser_fallback_url=${encodeURIComponent(whatsappWebUrl)};end`

export const contact = {
  whatsappDisplay: '0811 8880 9117',
  whatsappUrl: /Android/i.test(navigator.userAgent) ? whatsappAndroidUrl : whatsappWebUrl,
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

export const products = [
  {
    name: 'Soes',
    category: 'Pastry',
    description: 'Light choux pastry filled with smooth, creamy fla with a hint of rum.',
    image: soesPhoto,
    imagePosition: '60% 78%',
    alt: 'ZieSweets soes on a white plate, two halves showing the rum fla filling',
    featured: true,
  },
  {
    name: 'Fruit Pie',
    category: 'Pastry',
    description: 'Crisp tart shells filled with our rum fla, topped with strawberry, orange and kiwi.',
    image: fruitPiePhoto,
    imagePosition: '50% 80%',
    alt: 'Two ZieSweets fruit pies with strawberry, orange and kiwi on a wooden board, a boxed set behind them',
  },
  {
    name: 'Soft Bread',
    category: 'Bread',
    description: 'Soft, golden bread rolls with a glossy top and chocolate sprinkles.',
    image: breadPhoto,
    imagePosition: '50% 78%',
    alt: 'Two golden ZieSweets bread rolls with chocolate sprinkles on a wooden board, a full box behind them',
  },
  {
    name: 'Risol',
    category: 'Snack',
    description: 'Golden, crispy rolls coated in crunchy breadcrumbs.',
    image: risolPhoto,
    imagePosition: '55% 80%',
    alt: 'Two golden ZieSweets risol on a wooden board, a box of three behind them',
  },
  {
    name: 'Bolu Jadul',
    category: 'Cake',
    description: 'Old-fashioned sponge cake topped with grated cheese and chocolate sprinkles.',
    image: boluJadulPhoto,
    imagePosition: '50% 80%',
    alt: 'A slice of ZieSweets bolu jadul topped half with grated cheese and half with chocolate sprinkles',
  },
]

export const marqueeItems = ['Freshly baked everyday', ...products.map((p) => p.name), 'Since 2016']

export const stats = [
  { value: String(new Date().getFullYear() - 2016), label: 'Years of baking' },
  { value: String(products.length), label: 'Treats on the menu' },
  { value: dummyCustomers, label: 'Happy customers' },
]

export const reviews = dummyReviews
