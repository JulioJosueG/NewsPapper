import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
        {/*<!-- Footer Start -->*/}

         <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-md-6 copyright">
                <p>
                  Copyright &copy;{" "}
                   All Rights
                  Reserved
                </p>
              </div>

              <div class="col-md-6 template-by">
                <p>
                  NewsPaper By: <a href="https://github.com/JulioJosueG/NewsPapper">Julio Hernandez</a>
                </p>
              </div>
            </div>
          </div>
        </div>
            </div>
        )
    }
}
