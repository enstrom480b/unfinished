<?php
session_start();
$connect=mysqli_connect('localhost','root','','test');
if(isset($_POST['add_to_cart']))
{
if(isset($_SESSION['shopping_cart']))
{
	$item=array_column($_SESSION['shopping_cart'],'item_id');
	if(!in_array($_GET['id'],$item))
	{
		
		$count=count($_SESSION['shopping_cart']);
		$item_array=array(
		'item_id'=>$_GET['id'],
		'item_name'=>$_GET['hidden_name'],
		'item_price'=>$_GET['hidden_price'],
		'item_quantity'=>$_GET['quantity']);
		$_SESSION['shopping_cart'][$count]=$item_array;	
	}

}

else{

	echo '<script>alert("item already added")</script>';
	echo '<script>window.location="cart.php"</script>';
}

if(isset($_GET['action']))
{
	
if($_GET['action']=='delete')
{
	
	foreach($_SESSION['shopping_cart']as $keys=>$values)
	
	{
		if($values['item_id']==$_GET['id'])
		{
		unset($_SESSION['shopping_cart'][$keys]);
		echo '<script>alert("item removed")</script>';
		echo '<script>window.location="cart.php"</script>';
		}
		
	}
}
}

}


?>
<html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/b74b0d1f60.js" crossorigin="anonymous"></script>
<div class="container" style="width:700;background-color:f6f6f6;margin-top:12px">
<h3 align="center">Shopping Cart</h3><br>
<?php
$query="SELECT *FROM tabl_products order by id asc";
$result=mysqli_query($connect,$query);
if(mysqli_num_rows($result)>0)
{
	while($row=mysqli_fetch_array($result))
	{
?>		
<div class="col-md-4">
<form method="post" action="cart.php?action=add&id=<?php echo $row['id'];?>">
<img src="./<?php echo $row['image'];?>" style="align=center;border-radius:5px;border:1px solid #333;padding:10px;background-color:#f4f4f4;height:300px;width:300px"class="img-responsive"/><br/>
<h4 class="text-info"><?php echo $row['name'];?></h4>
<h4 class="text-danger">$<?php echo $row['price'];?></h4>
<input type="text" name="quantity" class="form-control" value="1"/>
<input type="hidden" name="hidden_name" value="<?php echo $row['name'];?>"/>
<input type="hidden" name="hidden_price" value="<?php echo $row['price'];?>"/>
<input type="submit" name="add_to_cart" style="margin-top:5px;" class="btn btn-success" value="add to cart"/>
</form>
</div>
<?php
	}

}
?>
</div>
<div style="clear:both"></div>
<br>
<h3>order details</h3>
<div class="table-resposiveness">
<table class="table table-bordered">
<tr>
<th width="40%">Item Name</th>
<th width="10%">Quantity</th>
<th width="20%">Price</th>
<th width="15%">Total</th>
<th width="5%">Action</th>
</tr>
</table>
</div>

</div>
<?php
if(!empty($_SESSION['shopping_cart']))
{
$total=0;

foreach($_SESSION['shopping_cart'] as $keys=>$values)
{
?>
<tr>
<td><?php echo $values['item_name'];?></td>
<td><?php echo $values['item_quantity'];?></td>
<td><?php echo $values['item_price'];?></td>
<td><?php echo $values['item_quantity'];?></td>
<td><a href="index.php?action=deleted&id=<?php echo values['item_id'];?>">Remove<span class="text-danger"></span><a/></td>
</tr>
<?php 
$total=$total+($values['item_quantity']*$values['item_price']);
}

?>
<tr>
<td colspan="3" align="right">Total</td>
<td align="right">$<? php echo number_format($total,3);?></td>
</tr>
</html>
<?php
}?>
