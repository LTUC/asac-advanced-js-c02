import React from 'react';
import superagent from 'superagent';
import { If } from 'react-if';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/HighlightOff';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Form from '../../components/set-api/api-settings.js';

const defaultProduct = JSON.stringify(
  { name: '', category: '', description: '', price: 1.99, inStock: 0 },
  null,
  2,
);

const classes = {
  heading: {
    margin: '1rem 0',
  },
  card: {
    margin: '1rem',
    width: '300px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    margin: '2rem 0',
  },
  categoryButton: {
    textTransform: 'none',
  },
  form: {
    margin: '1em auto',
    padding: '1em',
    background: '#f5f5f5',
    textAlign: 'center',
    width: '90%',
  },
  textarea: {
    display: 'block',
    height: '200px',
    width: '200px',
    margin: 'auto',
    fontSize: '1.1em',
  },
  buttons: {
    textAlign: 'center',
  },
  addCategoryForm: {
    alignSelf: 'center',
    margin: '0 1em',
  },
  deleteIcon: {
    color: 'red',
    fontSize: 'small',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: localStorage.getItem('api') || '',
      categories: [],
      products: [],
      error: '',
      productJSON: '',
      editingProduct: {},
      editingCategory: {},
    };
  }

  setAPI = api => {
    this.setState({ api });
    this.reset();
    this.getCategories();
  };

  fetch = async (url, node) => {
    try {
      const data = await superagent.get(url);
      // Class 06 just sends out an array of results
      // Later labs send a proper response with an embedded results array
      // This handles both of those
      let body = data.body.results || data.body;
      this.setState({ [node]: body });
    } catch (e) {
      this.setState({ [node]: [] });
      console.error(e.message);
    }
  };

  getProducts = cat => {
    const URL = `${this.state.api}/products?category=${cat}`;
    this.fetch(URL, 'products');
  };

  deleteProduct = async item => {
    try {
      const URL = `${this.state.api}/products/${item._id || item.id}`;
      await superagent.delete(URL);
      this.getProducts(item.category);
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  editProduct = item => {
    let product = { ...item };
    delete product.__v;
    product.id ? delete product.id : delete product._id;
    let productJSON = JSON.stringify(product, null, 2);
    this.setState({ editingProduct: item, productJSON });
  };

  cancelEditProduct = () => {
    this.reset();
  };

  saveProduct = async e => {
    e.preventDefault();

    try {
      let formData = new FormData(e.target);
      let object = {};
      for (var key of formData.keys()) {
        object[key] = formData.get(key);
      }

      const URL = `${this.state.api}/products/${object._id || object.id}`;
      const obj = JSON.parse(object.json);
      await superagent.put(URL).send(obj);
      this.getProducts(obj.category);
      this.reset();
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  addProduct = async e => {
    e.preventDefault();

    try {
      let formData = new FormData(e.target);
      let object = {};
      for (var key of formData.keys()) {
        object[key] = formData.get(key);
      }

      const URL = `${this.state.api}/products`;
      const obj = JSON.parse(object.json);
      await superagent.post(URL).send(obj);
      this.getProducts(obj.category);
      this.reset();
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  getCategories = cat => {
    const URL = `${this.state.api}/categories`;
    this.fetch(URL, 'categories');
  };

  addCategory = async e => {
    e.preventDefault();
    try {
      let formData = new FormData(e.target);
      let object = {};
      for (var key of formData.keys()) {
        object[key] = formData.get(key);
      }
      const URL = `${this.state.api}/categories`;
      await superagent.post(URL).send(object);
      this.getCategories();
      this.reset();
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  deleteCategory = async cat => {
    try {
      const URL = `${this.state.api}/categories/${cat._id || cat.id}`;
      await superagent.delete(URL);
      this.getCategories();
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  reset = () => {
    this.setState({
      error: '',
      editingProduct: {},
      editingCategory: {},
      productJSON: '',
      categoryJSON: '',
    });
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    console.log(this.state.products);
    return (
      <>
        <main>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={classes.heading}>Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={12}>
                    <Form onSubmit={this.setAPI} />
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>

          <Divider />
          <Typography style={classes.heading} variant="h5">
            Browse Product Categories
          </Typography>
          <Paper>
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              {this.state.categories.map(cat => (
                <Button
                  onClick={() => this.getProducts(cat.name)}
                  key={cat._id}
                  style={classes.categoryButton}
                >
                  {cat.name}
                  <DeleteIcon
                    id={`remove-cat-${cat.name}`}
                    onClick={() => this.deleteCategory(cat)}
                    fontSize="small"
                    style={{ marginLeft: '1em', color: 'red' }}
                  />
                </Button>
              ))}
              <form style={classes.addCategoryForm} onSubmit={this.addCategory}>
                <input placeholder="New Category" name="name" />
              </form>
            </ButtonGroup>
          </Paper>
          <div id="products" style={classes.products}>
            {this.state.products.map(item => (
              <Card key={item._id || item.id} style={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`http://placehold.it/200x200?text=${item.name}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => this.editProduct(item)}
                    size="small"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    id={`remove-item-${item.name}`}
                    onClick={() => this.deleteProduct(item)}
                    size="small"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </CardActions>
                <If condition={
                  this.state.editingProduct._id === item._id ||
                  this.state.editingProduct.id === item.id}
                >
                  <Paper style={classes.form} variant="outlined">
                    <Typography gutterBottom variant="h6" component="h6">
                      Edit Product
                    </Typography>
                    <form onSubmit={this.saveProduct}>
                      <textarea
                        style={classes.textarea}
                        onChange={this.updateProductJSON}
                        defaultValue={this.state.productJSON}
                        name="json"
                      />
                      <input type="hidden" name="_id" value={item._id || item.id} />
                      <div style={classes.buttons}>
                        <button id={`update-product-${item._id || item.id}`} type="submit">Save</button>
                        <button onClick={this.cancelEditProduct}>Cancel</button>
                      </div>
                    </form>
                  </Paper>
                </If>
              </Card>
            ))}

            <Card style={classes.card}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Add Product
                </Typography>

                <Typography variant="body2">
                  Enter valid JSON for a new product in the form below
                </Typography>
              </CardContent>

              <CardActions>
                <Paper style={classes.form} variant="outlined">
                  <form onSubmit={this.addProduct}>
                    <textarea
                      defaultValue={defaultProduct}
                      style={classes.textarea}
                      name="json"
                    />
                    <div style={classes.buttons}>
                      <button id="add-product" type="submit">Save</button>
                    </div>
                  </form>
                </Paper>
              </CardActions>
            </Card>
          </div>
        </main>
      </>
    );
  }
}

export default App;
