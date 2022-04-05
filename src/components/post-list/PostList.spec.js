import React from 'react';
import { mount } from '@cypress/react';
import PostList from './PostList'


const { faker } = require('@faker-js/faker');

function generatePost() {
    const title = faker.lorem.words(7)
    const date = faker.date.past()
    const body = {
        ...Array(3).map(()=> {
            return (
                <p>{faker.lorem.sentences(10)}</p>
            )
        })
    }

    return {
        frontmatter: {
            title: title,
            date: date
        },
        markdownBody: body
    }
}

describe("post-list with mock data"), () => {

    it("post-list renders", () => {
        var posts = []; 
        for(let i=0; i<50; i++) {
            posts.push(generatePost())
        }

        mount(<PostList posts={posts} />)
    })
}
