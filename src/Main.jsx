import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import MyList from './MyList'
import BookStatus from './BookStatus'

export default function Main() {
  return (
    <main>
        <Route exact path="/" component={Home} />
        <Route path="/mylist" component={MyList} />
        <Route path="/bookstatus/:bookId" component={BookStatus} />
    </main>
  )
}
