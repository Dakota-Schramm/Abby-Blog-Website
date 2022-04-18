import React from 'react';
import Blog from '.'
import { setConfig } from 'next/config';



const { faker } = require('@faker-js/faker');

function generatePost() {
    const title = faker.lorem.words(7)
    const date = faker.date.past()
    const body = `${[...Array(3)].map(() => `<p>${faker.lorem.sentences(10)}</p>` ).join("\n")}` 

    return {
        frontmatter: {
            title: title,
            date: date
        },
        markdownBody: body
    }
}

describe("post-list with mock data", () => {
    it('renders custom prop data for blogposts', () => {
        cy.visit('localhost:3000/posts', {
            onBeforeLoad: (win) => {
                let nextData

                var posts = []; 
                for(let i=0; i<50; i++) {
                    posts.push(generatePost())
                }

                Object.defineProperty(win, '__NEXT_DATA__', {
                    set(o) {
                        console.log('setting __NEXT_DATA__', o)
                        // here is our change to modify the injected parsed data
                        o.props.pageProps.posts = []
                        o.props.pageProps.posts = posts 
                        nextData = o
                    },
                    get() {
                        return nextData
                    },
                })
            },
        })
    })
})
