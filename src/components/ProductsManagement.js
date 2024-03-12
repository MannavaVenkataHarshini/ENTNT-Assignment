import React, { useState, useEffect } from 'react';
import './ProductsManagement.css';
import { Table, TableHead, TableBody, TableRow, TableCell, Dialog, Button, DialogTitle, DialogContent, TextField, Box ,MenuItem} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductsManagement() {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productCount, setProductCount] = useState(products.length);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true); 

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    setProductCount(products.length);
  }, [products]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && !isNaN(parseFloat(newProduct.price)) && newProduct.stock) {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
      setOpenAddDialog(false);
      setNewProduct({ name: '', category: '', price: '', stock: '' });
      setIsPriceValid(true); 
    } else {
      toast.error('Please fill in all fields correctly or put valid value for price');

      setIsPriceValid(false); 

    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id ? { ...selectedProduct } : product
    );
    setProducts(updatedProducts);
    setOpenEditDialog(false);
  };

  const goToDashboard = () => {
    navigate('/');
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box>
      <ToastContainer />
      <Box className="menu-toggle" onClick={toggleSidebar}>
        <MenuIcon style={{ fontSize: "3rem" }} />
      </Box>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Box className="products-container" marginBottom={4}>
        <Box className="add-product-container">
          <Button onClick={() => setOpenAddDialog(true)} variant='contained' className='addbutton' endIcon={<AddIcon />}>
            Add
          </Button>
        </Box>
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle >Add New Product</DialogTitle>
          <DialogContent>
            <TextField label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <TextField label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            <TextField label="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            {!isPriceValid && <div style={{ color: 'red' }}>Please enter a valid price.</div>} 
            <TextField
              select
              label="Stock"
              value={newProduct.stock}
              style={{width:'210px'}}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              

            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="not available">Not Available</MenuItem>
            </TextField>
            <Button onClick={handleAddProduct}>Add</Button>
          </DialogContent>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField label="Name" value={selectedProduct ? selectedProduct.name : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
            <TextField label="Category" value={selectedProduct ? selectedProduct.category : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} />
            <TextField label="Price" value={selectedProduct ? selectedProduct.price : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
            <TextField
              select
              label="Stock"
              value={selectedProduct ? selectedProduct.stock : ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
              fullWidth
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="not available">Not Available</MenuItem>
            </TextField>
            <Button onClick={handleUpdateProduct}>Update</Button>
          </DialogContent>
        </Dialog>
        <Box className="table-container">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody >
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditProduct(product)}>
                      <button className="edit-button"><EditIcon style={{ color: 'white' }} /></button>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                      <button className="delete-button" ><DeleteIcon style={{ color: 'white' }} /></button>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Button onClick={goToDashboard} variant='contained' className='back-button'>
        Back
      </Button>
    </Box>
  );
}

export default ProductsManagement;
