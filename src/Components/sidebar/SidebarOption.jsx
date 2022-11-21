import React from 'react'
import './sidebaroption.css'
export default function SidebarOption({title, Icon}) {
  return (
    <div className='sidebar-options'>
        {Icon && <Icon className='sidebar-option-icon'/>}
        <div>{title}</div>
    </div>
  )
}
