import React, { Component } from 'react'

export default class TopBar extends Component {
    render() {
        return (
            <div>
                <div className="top-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="tb-contact">
                  <p>
                    <i className="fas fa-envelope"></i>jh2019-0417@uce.edu.do
                  </p>
                  <p>
                    <i className="fas fa-phone-alt"></i>+1 809 506 3933
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tb-menu">
                  <a href="">About</a>
                  <a href="">Privacy</a>
                  <a href="">Terms</a>
                  <a href="">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
        )
    }
}
