<script>
	export let i
	export let notificationIndex
	export let removeNotification
	export let type = ''
</script>

<div
	class="alert {type}"
	style="--index: {notificationIndex} "
	on:pointerup={removeNotification}>
	<span>Notification number {i}</span>
</div>
