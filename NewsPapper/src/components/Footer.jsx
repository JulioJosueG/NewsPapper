import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 copyright">
                <p>Copyright &copy; All Rights Reserved</p>
              </div>
              <div className="col-md-6 template-by">
                <p>
                  NewsPaper By:{" "}
                  <a color="white" href="https://github.com/JulioJosueG/NewsPapper">
                  Julio Hernandez
                  
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
