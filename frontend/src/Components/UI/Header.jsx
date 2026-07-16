import { Layout } from 'antd'
import React from 'react'
const { Header: NavBar,Content,Footer } = Layout
const Header = () => {
  return (
    <Layout>
        <NavBar>Header</NavBar>
        <Content>Content</Content>
        <Footer>Footer</Footer>
    </Layout>
  )
}

export default Header