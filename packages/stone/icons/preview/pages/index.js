import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as icons from '@stone/icons';
import pkg from '@stone/icons/package.json';

const cates = {};
Object.keys(icons).forEach((name) => {
  const regRet = /^(Small|Middle)/.exec(name);
  const size = regRet ? regRet[0] : 'Normal';
  if (!cates[size]) {
    cates[size] = [];
  }
  cates[size].push(name);
});

const sizeMapping = {
  Small: 16,
  Middle: 20,
  Normal: 24,
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>@stone/icons preview</title>
        <meta name="description" content="@stone/icons preview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>@stone/icons@{pkg.version} preview</h1>
        <div>
          {Object.keys(cates)
            .sort((a, b) => sizeMapping[a] - sizeMapping[b])
            .reverse()
            .map((cate) => {
              return (
                <div key={cate}>
                  <h2>
                    {cate} Size: {sizeMapping[cate]}px
                  </h2>
                  <div style={{ fontSize: `${sizeMapping[cate]}px` }} className={styles.grid}>
                    {cates[cate].map((name) => {
                      const Icon = icons[name];
                      return (
                        <div key={name} className={styles.card} title={name}>
                          <Icon />
                          <p>{name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>@stone preview.</span>
      </footer>
    </div>
  );
}
