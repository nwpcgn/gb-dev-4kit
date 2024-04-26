<script>
	export let i
	export let notificationIndex
	export let type = ''
</script>

<div class="alert {type}" style="--index: {notificationIndex} ">
	<span>Notification number {i}</span>
</div>
