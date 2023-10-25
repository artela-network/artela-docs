/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

const LearnThroughCodingCards = [
    {
        name: 'Hello world from Artela',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.hello-world">
                Learn how to build a hello world dApp with Aspect enabled!
            </Translate>
        ),
    },
    {
        name: 'Reentrancy guard with Aspect',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.reentrancy">
                Learn how to build a reentrancy guard with Aspect!
            </Translate>
        ),
    }
];

const DiveDeeperCards = [
    {
        name: 'Setup your own nodes',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.setup-your-own">
                Setup your own node for a local development env!
            </Translate>
        ),
    },
    {
        name: 'Join our testnet',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.join-test-net">
                Spin up your own node and join our test net!
            </Translate>
        ),
    },
    {
        name: 'Client APIs',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.client-api">
                Learn more details about our node APIs.
            </Translate>
        ),
    },
    {
        name: 'Aspect Lib',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.aspect-lib">
                Learn more details about Aspect library.
            </Translate>
        ),
    },
];

const LearnConceptsCards = [
    {
        name: 'Core Concepts',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.core-concepts">
                Basic concepts that developers need to know when built on Artela.
            </Translate>
        ),
    },
    {
        name: 'Advanced Concepts',
        url: {
            page: '',
        },
        description: (
            <Translate id="dev.overview.adv-concepts">
                Advanced concepts that is need to know if you want to built more advanced dApps on Artela.
            </Translate>
        ),
    }
];

interface Props {
    name: string;
    url: {
        page?: string;
        codepen?: string;
    };
    description: JSX.Element;
}

function OverviewCard({ name, url, description }: Props) {
    return (
        <div className="col col--6 margin-bottom--lg">
            <div className={clsx('card')}>
                <div className="card__body">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
                <div className="card__footer">
                    <div className="button-group button-group--block">
                        <Link className="button button--secondary" to={url.page}>
                            <Translate id="special.tryItButton">Learn now!</Translate>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LearnConcepts(): JSX.Element {
    return (
        <div className="row">
            {LearnConceptsCards.map((special) => (
                <OverviewCard key={special.name} {...special} />
            ))}
        </div>
    );
}

export function LearnThroughCoding(): JSX.Element {
    return (
        <div className="row">
            {LearnThroughCodingCards.map((special) => (
                <OverviewCard key={special.name} {...special} />
            ))}
        </div>
    );
}

export function DiveDeeper(): JSX.Element {
    return (
        <div className="row">
            {DiveDeeperCards.map((special) => (
                <OverviewCard key={special.name} {...special} />
            ))}
        </div>
    );
}

