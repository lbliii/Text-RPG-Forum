<script>
  import {Avatar, Card, Tooltip} from 'flowbite-svelte'
</script>

<main>
    <Card size="lg" padding="sm">
        <Avatar data-name="Jese Leos" rounded>JL</Avatar>
        <Tooltip triggeredBy="[data-name]" on:show={e => name = e.target.dataset.name}>{name}</Tooltip>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
    </Card>

</main>
