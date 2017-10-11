import './productForm.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Icon } from '@blueprintjs/core';
import styled from 'styled-components';
import { addProduct } from 'actions/productActions';

const Section = styled.section.attrs({
  className: props => props.product ? 'section-product' : '' ,
})`
  width: 50%;
  margin: 1.25rem auto 0 auto;
  padding: 1.25rem;
  text-align: left;
  border: 1px solid #c2c2c2;
`;

const SectionInner = styled.div`
  margin: 1.25rem 0;
`;

const SectionHeading = styled.h2`
  padding-bottom: 0.625rem;
  border-bottom: 1px solid #c2c2c2;
`;

const ProductNameLabel = styled.label.attrs({
  className: 'pt-label',
  htmlFor: '',
})``;

const ProductInput = styled.input`
  width: 100%;
`;

const ProductTextarea = styled.textarea`
  width: 100%;
`;

const ProductPriceLabel = styled.label.attrs({
  className: 'pt-label',
  htmlFor: '',
})``;

const ProductDescriptionLabel = styled.label.attrs({
  className: 'pt-label',
  htmlFor: '',
})``;

const ProductImageUploadLabel = styled.label.attrs({
  className: 'pt-label',
  htmlFor: '',
})``;

const ProductImageUploadInput = styled.label.attrs({
  className: 'pt-file-upload',
})`
  width: 100%;
`;

const ProductInputError = styled.p`
  color: #ff0000;
`;

const ProductTextareaError = ProductInputError.extend``;

const SubmitButton = styled.button.attrs({
  className: 'pt-button pt-intent-primary',
  type: 'submit',
})``;

const ButtonContainer = styled.div`
  margin-top: 0.625rem;
`;

class ProductForm extends Component {

  renderInputField = field => {
    const { touched, error } = field.meta;
    const className = `${field.className} ${touched && error ? 'input-error' : ''}`;
    return(
      <div>
        <ProductInput
          {...field.input}
          name={field.name}
          className={className}
          placeholder={field.placeholder}
          type={field.type}
          dir={field.dir}
        />
        {
          touched && error
            ? <ProductInputError><small>{error}</small></ProductInputError>
            : ''
        }
      </div>
    );
  }

  renderTextareaField = field => {
    const { touched, error } = field.meta;
    const className = `${field.className} ${touched && error ? 'input-error' : ''}`;
    return(
      <div>
        <ProductTextarea
          {...field.input}
          name={field.name}
          className={className}
          placeholder={field.placeholder}
          dir={field.dir}
        />
        {
          touched && error
          ? <ProductTextareaError><small>{error}</small></ProductTextareaError>
          : ''
        }
      </div>
    );
  }

  onSubmit = data => {
    const { addProduct, dispatch } = this.props;
    addProduct(data);
    dispatch(reset('product'));
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return(
      <Grid>
        <Section product>
          <SectionHeading>
            <Icon iconName="add-to-artifact" iconSize="inherit" />
            &nbsp;
            Add product
          </SectionHeading>
          <SectionInner>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Row>
                <Col xs={6} md={2}>
                  <ProductNameLabel>
                    Name
                  </ProductNameLabel>
                </Col>
                <Col xs={6} md={10} className="pt-form-content">
                  <Field
                    name="productName"
                    component={this.renderInputField}
                    className="pt-input"
                    placeholder="Product name"
                    type="text"
                    dir="auto"
                  />
                </Col>
              </Row>
              <br />

              <Row>
                <Col xs={6} md={2}>
                  <ProductPriceLabel>
                    Price
                  </ProductPriceLabel>
                </Col>
                <Col xs={6} md={10} className="pt-form-content">
                  <Field
                    name="productPrice"
                    component={this.renderInputField}
                    className="pt-input"
                    placeholder="Product price"
                    type="text"
                    dir="auto"
                  />
                </Col>
              </Row>
              <br />

              <Row>
                <Col xs={6} md={2}>
                  <ProductDescriptionLabel>
                    Description
                  </ProductDescriptionLabel>
                </Col>
                <Col xs={6} md={10} className="pt-form-content">
                  <Field
                    name="productDescription"
                    component={this.renderTextareaField}
                    className="pt-input"
                    placeholder="Product description"
                    dir="auto"
                  />
                </Col>
              </Row>
              <br />

              <Row>
                <Col xs={6} md={2}>
                  <ProductImageUploadLabel>
                    Upload image
                  </ProductImageUploadLabel>
                </Col>
                <Col xs={6} md={10} className="pt-form-content">
                  <ProductImageUploadInput>
                    <input type="file" />
                    <span className="pt-file-upload-input">Choose file...</span>
                  </ProductImageUploadInput>
                </Col>
              </Row>
              <br />

              <Row end="xs">
                <Col mdOffset={2} md={10} xsOffset={6} xs={6}>
                  <SubmitButton disabled={invalid || pristine || submitting}>
                    <Icon iconName="plus" />
                    Add
                  </SubmitButton>
                </Col>
              </Row>
            </form>
          </SectionInner>
          <ButtonContainer>
            <Link
              to="/admin"
              className="pt-button"
              role="button"
              tabIndex="0"
            >
              <Icon iconName="fast-backward" iconSize="inherit" />
              Back
            </Link>
          </ButtonContainer>
        </Section>
      </Grid>
    );
  };

};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  addProduct,
};

const validate = values => {
  const errors = {};
  const { productName, productPrice, productDescription } = values;
  if (!productName) {
    errors.productName = 'Required';
  } else if (productName.length > 15) {
    errors.productName = 'Must be 15 characters or less';
  } else if (productName.length < 5) {
    errors.productName = 'Must be 5 characters or more';
  } else if (!isNaN(Number(productName))) {
    errors.productName = 'Must be a string';
  };

  if (!productPrice) {
    errors.productPrice = 'Required';
  } else if (!/^[0-9]*$/.test(productPrice)) {
    errors.productPrice = 'Must be number';
  };

  if (!productDescription) {
    errors.productDescription = 'Required';
  } else if (productDescription.length < 8) {
    errors.productDescription = 'Must be 8 characters or more';
  };
  return errors;
};

const createReduxForm = reduxForm({
  form: 'product',
  validate,
});

const createConnection = connect(mapStateToProps, mapDispatchToProps)(ProductForm);

const ProductFormContainer = createReduxForm(createConnection);

export default ProductFormContainer;
