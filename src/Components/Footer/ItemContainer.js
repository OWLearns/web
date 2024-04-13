import React from 'react'
import { Item } from './Item'
import {COURSES, SOCIALMEDIA, CONTACT} from './Menu'
export const ItemContainer = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16'>
        <Item Links={COURSES} title="COURSES"/>
        <Item Links={SOCIALMEDIA} title="SOCIAL MEDIA"/>
        <Item Links={CONTACT} title="CONTACT"/>
    </div>
  )
}
