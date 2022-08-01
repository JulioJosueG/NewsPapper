import React, { Component } from "react";
import dateFormat from 'dateformat';

export default function NewsList(props) {
  return (
    <div className="mt-3">
      {props.isLoading ? <div className="loading"> Cargando...</div> : null}

      <div className="row">
        {props.articles.map((item, index) => {
          return (
            <div className="col-md-3" key={index}>
              <div className="card mb-3">
                <img
                  src={item.imageAt ?? "/default.jpg"}
                  className="card-img-top"
                  alt={item.Title}
                />
                <div className="card-body">
                  <h6  className="card-title">{item.title}</h6>
                  <p className="card-text">{item.content}</p>
                  <p className="card-text">By: {item.idAuthor }</p>
                  <div class="card-footer text-muted">
                  <p>{dateFormat( item.PublishedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                  </div>
                  

                  <a
                    href={item.url}
                    target="_blank"
                    className="btn btn-primary "
                  >
                    Leer Mas
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
