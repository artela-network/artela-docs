import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Chain-native',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Chain-native pattern的技术目标是让区块链共识层具备可扩展性，
        使开发者可以基于共识层扩展构建功能更丰富的应用功能，且无需单独部署新的区块链。
      </>
    ),
  },
  {
    title: 'Aspect',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
       Aspect是扩展共识层的编程单位，它由Pointcut和Advice组成。
       Pointcut是一组被注册在dJPM智能合约里的Aspect元信息, Advice是Aspect里的可运行程序。
      </>
    ),
  },
  {
    title: 'Scala-out',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       Artela validator node基础配置需满足n个CU，也就是Artela network基础tps有n x 1000。
       模块可以并行计算，有可预估的tps。 
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
