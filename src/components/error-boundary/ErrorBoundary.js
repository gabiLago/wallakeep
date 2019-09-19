import React from "react";

export default class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
    this.setState({ error });
  }
  render() {
    if (this.state.hasError) {
     
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }

}