import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'Place Order',
}

export default async function PlaceorderPage() {
  return <Form />
}