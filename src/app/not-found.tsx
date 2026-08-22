import { redirect } from 'next/navigation';

export default function NotFound() {
  // 301 Permanent Redirect for any unmapped Google URL directly to Home (/) to guarantee 0 404 errors
  redirect('/');
}
