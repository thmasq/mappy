import dynamic from 'next/dynamic';
import styles from './page.module.css';

// Dynamically import the OpenStreetMap component with SSR disabled
const OpenStreetMapWithNoSSR = dynamic(
  () => import('../components/OpenStreetMap'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className={styles.main}>
      <OpenStreetMapWithNoSSR />
    </main>
  );
}
