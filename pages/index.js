import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link"
import Layout, { siteTitle } from '@/components/Layout'
import utilStyle from "../styles/utils.module.css"
import { getPostData } from '../lib/post'

const inter = Inter({ subsets: ['latin'] })

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostData(); //id, title, date, thumbnail
  return {
    props: {
      allPostsData
    }
  }
}

// //SSRの場合
// export async function getServerSideProps(context){
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section  className={utilStyle.headingMd}>
      <p>私はフロントエンドエンジニア志望の掛川です</p>
      </section>
      <section>
        <h2>📝エンジニアブログ</h2>
      <div className={styles.grid}>
  
          {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage}></img>
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br/>
              <small className={utilStyle.lightText}>{date}</small>
        </article>
          ))}

      </div>
      </section>

    </Layout>

  );
}
