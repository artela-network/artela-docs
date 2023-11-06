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
        name: 'Develop a Smart Contract',
        url: {
            page: 'develop/get-started/dev-contract',
        },
        description: (
            <Translate id="dev.overview.hello-world">
                Learn how to build a hello world smart contract!
            </Translate>
        ),
    },
    {
        name: 'Develop an Aspect',
        url: {
            page: 'develop/get-started/sol-hello-world',
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
        name: 'Join Test Net',
        url: {
            page: 'develop/node/access-testnet',
        },
        description: (
            <Translate id="dev.overview.setup-your-own">
                Join our test net and start building your own dApp!
            </Translate>
        ),
    },
    {
        name: 'Join our testnet',
        url: {
            page: 'develop/node/testnet-setup',
        },
        description: (
            <Translate id="dev.overview.join-test-net">
                Spin up your own node and join our test net!
            </Translate>
        ),
    }
];

const LearnConceptsCards = [
    {
        name: 'Foundational Concepts',
        url: {
            page: 'develop/core-concepts/foundational',
        },
        description: (
            <Translate id="dev.overview.foundational">
                Basic concepts that developers need to know when built on Artela.
            </Translate>
        ),
    },
    {
        name: 'Aspect',
        url: {
            page: 'develop/core-concepts/aspect',
        },
        description: (
            <Translate id="dev.overview.aspect">
                Learn some new features that Artela brings to the table.
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

