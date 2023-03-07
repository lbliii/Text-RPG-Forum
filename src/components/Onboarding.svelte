<script>
    import { Identification, Sparkles } from 'svelte-heros-v2'
    import { Heading, Card, P, Button} from 'flowbite-svelte'

    export let user
    
</script>


{#if user.profile_setup === false}
    <Heading tag="h2" class="my-6 text-white flex items-center"><Identification size="30" class="inline-flex mr-3"/> Welcome to Emdash!  </Heading>
    <Card size="lg" padding="md" class="mb-4" color="green">
        <P size="xl" class="mb-3 font-semibold"> Let's set up your profile <Sparkles class="inline-flex ml-1"/></P>
        <P>
            Help users find you and suggest relevant plot ideas by setting up your profile with stuff like your <b>Alias</b>, <b>Time Zone</b>, <b>Likes</b>, and <b>Dislikes</b>.
        </P>
         <Button color="green" class="mt-3" href="/user/{user.id}">Set up Profile</Button>
    </Card>
{/if}