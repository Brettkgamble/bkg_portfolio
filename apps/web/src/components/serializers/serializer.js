// https://codesandbox.io/s/q4mzh?file=/src/Page.js
import React from 'react';
import { client } from '../../lib/sanity/client'
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/legacy/image'

const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source)
}

const serializers = {

      types: {
          value: (props) => {
              const style = props.value.style ;
              
              if (style == 'h1') {
                  return(
                      <h1 className="text-4xl pb-4 font-bold">{props.children}</h1>
                  )
              }
              if (style == 'h2') {
                  return(
                      <h2 className="text-3xl pb-4 font-bold">{props.children}</h2>
                  )
              }
              if (style == 'h3') {
                  return(
                      <h3 className="text-2xl pb-4 font-bold">{props.children}</h3>
                  )
              }
              if (style == 'h4') {
                  return(
                      <h4 className="text-xl pb-4 font-bold">{props.children}</h4>
                  )
              }
              if (style == 'h5') {
                  return(
                      <h5 className="text-base pb-4 font-bold">{props.children}</h5>
                  )
              }

              return style === "blockquote" ? (
                <blockquote>– {props.children}</blockquote>
              ) : (
                <p className="pb-4 pr-12 sm:pr-0 text-base">{props.children}</p>
              );
          },
        code: (props) => {
            return (
              <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
              </pre>
            )
        },
        image: props =>
          (

            <figure>
                <br />
                <Image
                      // preload="true"
                      // priority
                      quality="100"
                      layout="responsive"
                      height="60px"
                      width="120px"
                      src={urlFor(props.node.asset)
                      .width(500)
                      .url()}
                    alt={props.node.alt || "missing alt text"}
                  />
              {/*<img*/}
              {/*  src={urlFor(props.node.asset)*/}
              {/*    .width(500)*/}
              {/*    .url()}*/}
              {/*  alt={props.node.alt || "missing alt text"}*/}
              {/*/>*/}
              <figcaption className="text-center text-xs font-bold">
                  {props.node.caption}
              </figcaption>
            <br />
            </figure>
          ),

      },
      list: (props) =>
        (props.type === "bullet" ? (
          <ul className="list-disc list-outside text-base">{props.children}</ul>
        ) : (
          <ol className="list-decimal list-outside  text-base pl-4 pb-6">{props.children}</ol>
        )),
      listItem: (props) =>
        (props.type === "bullet" ? (
          <li className="text-base">{props.children}</li>
        ) : (
          <li className="text-base">{props.children}</li>
        )),
      value: {
          sup: (props) => <sup>{props.children}</sup>,
          sub: (props) => <sub>{props.children}</sub>,
          textAlignLeft: (props) => <div style={{textAlign: "left"}}>{props.children}</div>,
          textAlignCenter: (props) => <div style={{textAlign: "center"}}>{props.children}</div>,
          textAlignRight: (props) => <div style={{textAlign: "right"}}>{props.children}</div>,
      }
    }

export default  serializers;