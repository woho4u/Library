<script>
	let message = $$props.message;
	let type = $$props.type;
</script>

<div class="alert alert-{type}">
	<span>{message}</span>
</div>
