<script>
    import { Identification, Sparkles } from 'svelte-heros-v2'
    import { Heading, Card, P, Button} from 'flowbite-svelte'
    import { charactersStore } from '../../stores/charactersStore.js'
    import CharacterCRUD from '../character/CharacterCRUD.svelte'
    import { fade } from 'svelte/transition'

    export let user

    $: {
    if (user.user_id) {
      charactersStore.fetchCharacters(user.user_id);
    }
  }
    
</script>

<div in:fade="{{ duration: 1100 }}"> 
    {#if user.profile_setup === false}
        <Heading tag="h2" class="my-6 text-white flex items-center"><Identification size="30" class="inline-flex mr-3"/> Welcome to Emdash!  </Heading>
        <Card size="lg" padding="md" class="mb-4" color="green">
            <P size="xl" class="mb-3 font-semibold"> Let's set up your profile ✨</P>
            <P>
                Help users find you and suggest relevant plot ideas by setting up your profile with stuff like your <b>Alias</b>, <b>Time Zone</b>, <b>Likes</b>, and <b>Dislikes</b>.
            </P>
            <Button size="xs" color="green" class="mt-3" href="/user/{user.user_id}">Set up Profile</Button>
        </Card>
    {:else if $charactersStore && $charactersStore.length === 0}
        <Heading tag="h2" class="my-6 text-white flex items-center"><Identification size="30" class="inline-flex mr-3"/> Welcome to Emdash!  </Heading>
        <Card size="lg" padding="sm" class="my-2" color="green"> 
            <P size="xl" class="mb-3 font-semibold"> Let's create your first character 🎮 </P>
            <P class="mb-3">
                Here's the deal: You can't play Emdash without a character. So why not create one that's as epic as you are? Your character is your writing persona, your alter ego, your imaginary friend -- the one who will bring your threads and posts to life. <br><br>

                (And don't worry, you can always create more characters later from your profile page.)
            </P>
            <CharacterCRUD create={true} player={user} />
        
        </Card>
    {/if}
</div>




