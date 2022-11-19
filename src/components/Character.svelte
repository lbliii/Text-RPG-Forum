<script>
    export let character;
    import {Avatar, Card, Tooltip} from 'flowbite-svelte'
    
</script>


<div class="my-2">
     <Card size="lg" padding="sm">
        <Avatar data-name="{character.first_name}" rounded>{character.first_name}</Avatar>
        <Tooltip triggeredBy="[data-name]" on:show={e => name = e.target.dataset.name}>{name}</Tooltip>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        {character.bio}
        </p>
    </Card>
</div>

