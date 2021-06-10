import React, { Component } from 'react'

export default class SearchBox extends Component {

    constructor(props){
        super(props)
    }

  handleFormSubmit= (event) => {
        event.preventDefault()
        this.props.onSearch(event.target.elements['search'].value)
  }
  
    render() {
        return (
            <div>
                <form className='d-flex' onSubmit={this.handleFormSubmit}>
                    <div className='flex-grow-1'>


                        {this.props.value ? <input name='search' type="text" className='form-control' placeholder='Buscar Noticias...' defaultValue={this.props.value}/> :
                        <input name='search' type="text" className='form-control' placeholder='Buscar Noticias...'/>}
                        
                    </div>
                    <div className='d-grid gasp-2 ms-3' style={{width:'120px'}} >
                    {
                        this.props.searching ? <button className='btn btn-dark d-block' onClick={this.props.onClear}>Borrar</button> :
                        <button className='btn btn-primary d-block' type="submit">Buscar</button>
                    }



                        
                    </div>
                </form>
            </div>
        )
    }
}
