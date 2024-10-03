import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    link: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    // {
    //     title: 'Easy to Use',
    //     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    //     description: (
    //         <>
    //             Docusaurus was designed from the ground up to be easily installed and used to get
    //             your website up and running quickly.
    //         </>
    //     )
    // },
    {
        title: 'Web前端知识温故而知新',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        link: '/docs/introduce',
        description: (
            <>
                内容覆盖：计算机网络、前端三剑客基础知识、Web前端常用技术、现代前端工程链
            </>
            // <>
            //     Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and
            //     move your docs into the <code>docs</code> directory.
            // </>
        )
    },
    {
        title: '个人随记',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        link: '/blog',
        description: <>记录前端学习历程、技术总结、面试经验、个人心得体会等。</>
    }
];

function Feature({ title, Svg, description, link }: FeatureItem) {
    return (
        <div className={clsx('col col--6')}>
            <Link to={link as string}>
                <div className="text--center">
                    <Svg className={styles.featureSvg} role="img" />
                </div>
                <div className="text--center padding-horiz--md">
                    <Heading as="h3">{title}</Heading>
                    <p>{description}</p>
                </div>
            </Link>
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
