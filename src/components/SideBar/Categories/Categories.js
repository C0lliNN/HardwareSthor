import React from 'react'
import classes from './Categories.module.css'
import Category from './Category/Category'

const Categories = () => {

    const categoriesList = [
        {
            text: "Processador",
            path: "/category/processor"
        },
        {
            text: "RAM Memory",
            path: "/category/memory"
        },
        {
            text: "Hard Drive",
            path: "/category/hd"
        },
        {
            text: "Motherboard",
            path: "/category/motherboard"
        },
        {
            text: "Graphic Card",
            path: "/category/gpu"
        },
        {
            text: "Mouse",
            path: "/category/mouse"
        },
        {
            text: "Mouse 2",
            path: "/category/mouse2"
        },
        {
            text: "Mouse 3",
            path: "/category/mouse3"
        },
        {
            text: "Mouse 4",
            path: "/category/mouse4"
        },
        {
            text: "Mouse 5",
            path: "/category/mouse5"
        },
        {
            text: "Mouse 6",
            path: "/category/mouse6"
        },
        {
            text: "Mouse 7",
            path: "/category/mouse7"
        },
        {
            text: "Mouse 2",
            path: "/category/mouse2"
        },
        {
            text: "Mouse 8",
            path: "/category/mouse8"
        },
        {
            text: "Mouse 9",
            path: "/category/mouse9"
        },
        {
            text: "Mouse 10",
            path: "/category/mouse10"
        },
        {
            text: "Mouse 11",
            path: "/category/mouse11"
        },
        {
            text: "Mouse 12",
            path: "/category/mouse12"
        }
    ]

    return (
        <ul className={classes.Categories}>
            {
                categoriesList.map(category => (
                    <Category 
                        key={category.text}
                        text={category.text} 
                        path={category.path}/>
                ))
            }
        </ul>
    )
}

export default Categories;