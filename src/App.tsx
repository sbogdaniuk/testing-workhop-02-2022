import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { GraphQLApp } from './graphql'
import { ReactQueryApp } from './react-query'
import { ReduxApp } from './redux'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <main>
                <div>
                  <h1>Testing workshop</h1>
                  <ul>
                    <li><Link to="/graphql">GraphQL</Link></li>
                    <li><Link to="/react-query">React Query</Link></li>
                    <li><Link to="/redux">Redux</Link></li>
                  </ul>
                </div>
              </main>
            } />
            <Route path="graphql" element={<GraphQLApp />} />
            <Route path="react-query" element={<ReactQueryApp />} />
            <Route path="redux" element={<ReduxApp />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
