import { environment } from 'src/environments/environment'
export const baseUrl = environment.production ? 'https://http://localhost:4200/home' : 'http://localhost:3000'
export const wishlistUrl = baseUrl + '/wishlist'